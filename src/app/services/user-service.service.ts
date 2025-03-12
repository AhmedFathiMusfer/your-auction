import { Injectable } from '@angular/core';
import IUser from '../Models/User/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  users: IUser[];
  constructor() {
    this.users = [
      {
        id: 1,
        name: 'John Doe',
        email: 'Ahmed@gmail.com',
        Phone: '776323368',
        address: '123 Main St',
        password: '123456',
        status: 'موثق',
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'ali@gmail.com',
        Phone: '776323368',
        address: '123 Main St',
        password: '123456',
        status: 'موثق',
      },
      {
        id: 3,
        name: 'Jane Doe',
        email: 'aaa@gmail.com',
        Phone: '776323368',
        address: '123 Main St',
        password: '123456',
        status: 'جاري التحقق',
      },
      {
        id: 4,
        name: 'Jane Doe',
        email: 'moo@gmail.com',
        Phone: '776323368',
        address: '123 Main St',
        password: '123456',
        status: 'غير موثق',
      },
    ];
  }
  getUser(): IUser[] {
    return this.users;
  }
}
