import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _toastService: ToastrService) {}

  sucess(message: string, tilte: string) {
    this._toastService.success(message, tilte);
  }
  error(message: string, tilte: string) {
    this._toastService.error(message, tilte);
  }
}
