import { Injectable } from '@angular/core';
import IAuction from '../Models/Auction/IAuction';
import { DatasetController } from 'chart.js';
import IAddAuction from '../Models/Auction/IAddAuction';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import Bidder from '../Models/Auction/Bidder';
import PaginatedResult from '../Models/Pagination/PaginatedResult';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  auctions: IAuction[] = [];
  date: Date = new Date(Date.now());
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {
    /* this.auctions = [
      {
        id: 1,
        name: 'كورلا',
        description: 'جديد',
        numperOfBidders: 5,
        createdAt: this.date,
        endtedAt: new Date(this.date.setDate(this.date.getDate() + 5)),
        quantity: 2,
        price: 100,
        status: 'جاري',
      },
      {
        id: 2,
        name: 'كورلا',
        description: 'جديد',
        numperOfBidders: 5,
        createdAt: this.date,
        endtedAt: new Date(this.date.setDate(this.date.getDate() + 5)),
        quantity: 2,
        price: 100,
        status: 'جاري',
      },
      {
        id: 3,
        name: 'كورلا',
        description: 'جديد',
        numperOfBidders: 5,
        createdAt: this.date,
        endtedAt: new Date(this.date.setDate(this.date.getDate() + 5)),
        quantity: 2,
        price: 100,
        status: 'قادم',
      },
      {
        id: 4,
        name: 'كورلا',
        description: 'جديد',
        numperOfBidders: 5,
        createdAt: this.date,
        endtedAt: new Date(this.date.setDate(this.date.getDate() + 5)),
        quantity: 2,
        price: 100,
        status: 'منتهي',
      },
      {
        id: 5,
        name: 'كورلا',
        description: 'جديد',
        numperOfBidders: 5,
        createdAt: this.date,
        endtedAt: new Date(this.date.setDate(this.date.getDate() + 5)),
        quantity: 2,
        price: 100,
        status: 'منتهي',
      },
    ];***/
  }
  getAuction(
    page: number,
    pageSize: number,
    search?: string
  ): Observable<PaginatedResult<IAuction>> {
    let params = new HttpParams()
      .set('pageNumber', page)
      .set('pageSize', pageSize);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResult<IAuction>>(
      `${this.baseUrl}/Auction/WithDetails`,
      { params } // ✅ Send params with request
    );
  }
  addAuction(data: IAddAuction): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Auction`, data);
  }
  completeAuction(auctionId: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Auction/${auctionId}/Completed`, []);
  }
  datailsAuction(auctionId: any): Observable<IAuction> {
    return this.http.get<IAuction>(`${this.baseUrl}/Auction/${auctionId}`);
  }
  getBidders(auctionId: any): Observable<Bidder[]> {
    return this.http.get<Bidder[]>(
      `$${this.baseUrl}/Auction/${auctionId}/bidders`
    );
  }
  addBidder(bidder: Bidder): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/${bidder.auctionId}/bidders`,
      bidder
    );
  }
}
