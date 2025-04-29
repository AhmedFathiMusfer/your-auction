import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        toastr.error('Unauthorized access, please log in again.');
        router.navigate(['Login']);
      } else if (error.status === 403) {
        toastr.error('You do not have permission to access this resource.');
      } else if (error.status === 404) {
        toastr.warning('The requested resource was not found.');
      } else if (error.status >= 500) {
        // Server error
        toastr.error('Server error, please try again later.');
      } else if (error.status === 400) {
        console.log(error.error);
        return throwError(() => error.error);
      } else {
        toastr.error(error.message || 'An error occurred.');
      }
      return throwError(() => new Error(error.message));
    })
  );
};
