import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import DashboardData from '../Models/Dashboard/DashboardData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) {}

  getDashboardData(): Observable<DashboardData> {
    return this._http.get<DashboardData>(`${this.baseUrl}/Dashboard/Summary`);
  }
}
