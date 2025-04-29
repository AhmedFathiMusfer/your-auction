import { Injectable } from '@angular/core';
import IProduct from '../Models/Product/IProduct';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //products: IProduct[];
  baseUrl = environment.baseUrl;
  productId: number | null = null;
  isUpdaetMode: boolean = false;
  constructor(private http: HttpClient) {}
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/Product`).pipe(
      map((data: IProduct[]) => {
        data = data as IProduct[];
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  addProduct(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Product`, data).pipe(
      catchError((erorr) => {
        console.log(erorr);
        return throwError(() => erorr);
      })
    );
  }
  addProductImage(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/File/UploadImageToTemp`, data).pipe(
      catchError((erorr) => {
        return throwError(() => erorr);
      })
    );
  }
  getProductById(Id: any): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/Product/${Id}`).pipe(
      map((data: IProduct) => {
        data = data as IProduct;
        return data;
      }),
      catchError((erorr) => {
        return throwError(() => erorr);
      })
    );
  }
  addProductToAuction(productId: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}Product/${productId}/Auction`, {})
      .pipe(
        catchError((erorr) => {
          return throwError(() => erorr);
        })
      );
  }
  updateProduct(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Product/${data.id}`, data).pipe(
      catchError((erorr) => {
        return throwError(() => erorr);
      })
    );
  }
}
