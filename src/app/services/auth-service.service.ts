import { Injectable } from '@angular/core';
import ILoginRequset from '../Models/Auth/loginRequset';
import IUser from '../Models/User/IUser';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private _userService: UserServiceService) {}

  login(loginRequset: ILoginRequset): boolean {
    let user = this._userService
      .getUser()
      .find((u) => u.email == loginRequset.email);
    if (user) {
      if (user.password == loginRequset.password) {
        return true;
      }
    }
    return false;
  }
}
