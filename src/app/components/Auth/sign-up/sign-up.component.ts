import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import Regisetr from '../../../Models/Auth/Auth';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, FormsModule, JsonPipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  registerDate!: Regisetr;
  responseBody: any = null; // لتخزين الرد
  errorMessage: string = '';
  constructor(private _authService: AuthService) {
    this.registerDate = {
      email: '',
      phoneNumber: '',
      Role: 'ooo',
      Password: 'jhjhjh',
      Name: '',
    };
  }
  ngOnInit(): void {
    this.register();
  }

  register() {
    this.registerDate.Role = 'kkk';
    this._authService.register(this.registerDate).subscribe({
      next: (data) => {
        console.log('✅ البيانات المسترجعة:', data);
        this.responseBody = data;
      },
      error: (error) => {
        console.error('❌ حدث خطأ:', error);
        this.errorMessage = error.error;
      },
    });
  }
}
