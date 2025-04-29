import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  private userProfile = new BehaviorSubject<IUserProfile>({
    name: '',
    userName: '',
    imageUrl: '',
    phoneNumber: '',
  });
  currentUserData = this.userProfile.asObservable();

  getCurrentUserData() {}
  login(data: any): Observable<IUserProfile> {
    return this.http
      .post<IUserProfile>(`${this.baseUrl}/Profile/userData`, data)
      .pipe();
  }
}
