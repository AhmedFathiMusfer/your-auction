import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { catchError, Observable, Observer, throwError } from 'rxjs';
import ICategory from '../Models/Category/ICategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}/category`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
