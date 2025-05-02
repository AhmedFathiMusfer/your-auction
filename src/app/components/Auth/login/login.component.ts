import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { Login } from '../../../Models/Auth/Auth';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  LoginRequset: Login;
  successLogin: boolean = true;
  constructor(private _authService: AuthService, private _router: Router) {
    this.LoginRequset = {
      email: '',
      password: '',
    };
  }
  login() {
    console.log('LoginRequset:', this.LoginRequset);
    var respons = this._authService.login(this.LoginRequset).subscribe({
      next: (data) => {
        console.log('✅ البيانات المسترجعة:', data);
        this.successLogin = true;
        this._router.navigate(['Admin/User']);
      },
      error: (error) => {
        console.error('❌ حدث خطأ:', error);
        this.successLogin = false;
      },
    });
    if (this.successLogin) {
      // this._router.navigate(['/User']);
    }
  }
}
