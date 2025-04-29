import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import ImageUrl from '../Models/File/ImageUrl';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  baseUrl: String = environment.baseUrl;

  constructor(private _http: HttpClient) {}
  uploadImageToTemp(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this._http
      .post<{ url: string }>(`${this.baseUrl}/File/UploadImageToTemp`, formData)
      .pipe(
        map((response: { url: string }) => {
          return response.url;
        })
      );
  }
  uploadImageToProduct(file: File, ProductId: number): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this._http
      .post<{ url: string }>(
        `${this.baseUrl}/File/AddImageToProduct/${ProductId}`,
        formData
      )
      .pipe(
        map((response: { url: string }) => {
          return response.url;
        })
      );
  }
  removeImagFromTemp(imageUrl: ImageUrl): Observable<any> {
    console.log(imageUrl);
    let params = new HttpParams().set('ImageUrl', imageUrl.ImageUrl);
    return this._http.put(
      `${this.baseUrl}/File/DeleteImageFromTemp`,
      {},
      {
        params,
      }
    );
  }
  removeImageFromProduct(imageUrl: ImageUrl, ProductId: any): Observable<any> {
    console.log(imageUrl);
    let params = new HttpParams().set('ImageUrl', imageUrl.ImageUrl);
    return this._http.put(
      `${this.baseUrl}/File/DeleteImageFromProduct/${ProductId}`,
      {},
      { params }
    );
  }
}
