import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, ReplaySubject, throwError } from 'rxjs';
import Regisetr, { Login, LoginResponse } from '../Models/Auth/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;
  private currentUserSource = new ReplaySubject<LoginResponse | null>(1);
  public currentUser: Observable<LoginResponse | null> =
    this.currentUserSource.asObservable();
  constructor(private http: HttpClient) {}

  login(data: Login): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/Auth/login`, data)
      .pipe<LoginResponse>(
        map((response) => {
          console.log('Response:', response);
          response as LoginResponse;
          if (response) {
            this.setCurrentUser(response);
          }
          return response;
        })
      );
  }
  register(data: Regisetr): Observable<any> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/Auth/register`, data)
      .pipe(
        map((response) => {
          console.log('Response:', response);
          response as LoginResponse;
          if (response) {
            this.setCurrentUser(response);
          }
          return response;
        }),
        catchError((error) => {
          return throwError(() => error); // إعادة الخطأ بكامل التفاصيل
        })
      );
  }
  private setCurrentUser(user: LoginResponse): void {
    user.userData.roles = [];
    const roles = this.getDecodedToken(user.accessToken).role;
    console.log('Roles:', roles);
    Array.isArray(roles)
      ? (user.userData.roles = roles)
      : user.userData.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
  private getDecodedToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
  public updateCachedProfilePicture(pictureUrl: string): void {
    let user = localStorage.getItem('user') as LoginResponse | null;
    if (user) {
      user.userData.profilePictureUrl = pictureUrl;
      localStorage.removeItem('user');
      this.setCurrentUser(user);
    }
  }
  public logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  public getToken(): string | null {
    const token = localStorage.getItem('user');
    if (!token) return null;
    const user = JSON.parse(token as string);
    console.log('Parsed Token:', user.accessToken);
    return user.accessToken ? user.accessToken : null;
  }
}
