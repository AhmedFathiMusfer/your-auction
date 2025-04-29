import { Component, OnInit } from '@angular/core';
import {
  Stripe,
  StripeElements,
  StripeCardElement,
  loadStripe,
} from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from '../../services/payment.service';
import SavePayment from '../../Models/Payment/SavePayment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  paymentData: SavePayment;
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  clientSecret: string = '';
  style = {
    base: {
      fontSize: '16px',
      color: '#1f2937', // Tailwind gray-800
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      '::placeholder': {
        color: '#9ca3af', // Tailwind gray-400
      },
    },
    invalid: {
      color: '#dc2626', // Tailwind red-600
    },
  };

  constructor(
    private http: HttpClient,
    private paymentService: PaymentService,
    private _rote: Router
  ) {
    this.paymentData = new SavePayment();
  }

  async ngOnInit() {
    this.stripe = await loadStripe(
      'pk_test_51RGSMmIimftlRVK72LgpQSE7JAZKyj38t3eMTq0SUYyQqd3uIZuhYzf34BJxX169bm0dm4oCSagViRxOBHfaBRMp00BwLyoFH3'
    );
    this.elements = this.stripe!.elements({ locale: 'ar' });
    this.card = this.elements.create('card', { style: this.style });
    this.card.mount('#card-element');

    this.paymentService.CreateSetupIntent().subscribe({
      next: (data) => {
        console.log('the data' + data);
        this.clientSecret = data.clientSecret;
        this.paymentData.CustomerId = data.customerId;
        console.log('this client screte' + data.clientSecret);
      },
      error: (error) => {
        console.log(error);
      },
    });
    // Call backend to get setupIntent clientSecret
    /*this.http
      .post<any>(
        'https://localhost:5001/payment/create-setup-intent',
        'cus_123',
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .subscribe((res) => {
        this.clientSecret = res.clientSecret;
      });*/
  }

  async handleSubmit() {
    const result = await this.stripe!.confirmCardSetup(this.clientSecret, {
      payment_method: {
        card: this.card!,
        billing_details: {
          name: 'User Full Name',
        },
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      const paymentMethodId = result.setupIntent.payment_method;
      console.log('PaymentMethod ID:', paymentMethodId);
      this.paymentData.paymentMethodId =
        paymentMethodId != null ? (paymentMethodId as string) : '';
      console.log(this.paymentData.paymentMethodId);
      // Send to backend to check funds
      this.paymentService.SavePaymentMethod(this.paymentData).subscribe({
        next: (data) => {
          this._rote.navigate(['/AuctionUser']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
