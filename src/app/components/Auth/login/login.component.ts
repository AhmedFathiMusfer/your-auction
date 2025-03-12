import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';
import ILoginRequset from '../../../Models/Auth/loginRequset';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  LoginRequset: ILoginRequset;
  successLogin: boolean = true;
  constructor(
    private _authServiceService: AuthServiceService,
    private _router: Router
  ) {
    this.LoginRequset = {
      email: '',
      password: '',
    };
  }
  login() {
    this.successLogin = this._authServiceService.login(this.LoginRequset);
    if (this.successLogin) {
      this._router.navigate(['/User']);
    }
  }
}
