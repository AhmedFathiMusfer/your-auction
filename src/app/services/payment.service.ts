import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import CreateSetupIntent from '../Models/Payment/CreateSetupIntent';
import SavePayment from '../Models/Payment/SavePayment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}
  getPaymentStatus(): Observable<boolean> {
    return this._http
      .get<{ needCard: boolean }>(`${this.baseUrl}/Payment/GetPaymentStatus`)
      .pipe(
        map((responce: { needCard: boolean }) => {
          return responce.needCard;
        })
      );
  }
  CreateSetupIntent(): Observable<CreateSetupIntent> {
    return this._http
      .post<CreateSetupIntent>(`${this.baseUrl}/Payment/CreateSetupIntent`, {})
      .pipe(
        map((data: CreateSetupIntent) => {
          data = data as CreateSetupIntent;
          return data;
        })
      );
  }
  SavePaymentMethod(data: SavePayment): Observable<any> {
    return this._http.post<any>(
      `${this.baseUrl}/Payment/SavePaymentMethod`,
      data
    );
  }
}
