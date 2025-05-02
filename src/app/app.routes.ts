import { Routes } from '@angular/router';
import { SignUpComponent } from './components/Auth/sign-up/sign-up.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { UsersManagementComponent } from './components/user/users-management/users-management.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product/product.component';
import { AuctionComponent } from './components/auction/auction/auction.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { hasPermissionGuard } from './guard/has-permission.guard';

export const routes: Routes = [
  {
    path: 'Admin/Dashboard',
    component: DashboardComponent,
    canActivate: [hasPermissionGuard],
  },
  {
    path: 'Admin/Products',
    component: ProductComponent,
    canActivate: [hasPermissionGuard],
  },
  {
    path: 'Admin/Products/add',
    component: ProductFormComponent,
    canActivate: [hasPermissionGuard],
  },
  {
    path: 'Admin/Products/update/:id',
    component: ProductFormComponent,
    canActivate: [hasPermissionGuard],
  },
  {
    path: 'Admin/Products/details/:id',
    component: ProductDetailsComponent,
    canActivate: [hasPermissionGuard],
  },
  {
    path: 'Admin/Auction',
    component: AuctionComponent,
    canActivate: [hasPermissionGuard],
  },
  {
    path: 'Admin/User',
    component: UsersManagementComponent,
    canActivate: [hasPermissionGuard],
  },
  {
    path: 'SignUp',
    component: SignUpComponent,
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Home',
    loadComponent: () =>
      import('./components/customer/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: 'Payment',
    loadComponent: () =>
      import('./components/payment/payment.component').then(
        (c) => c.PaymentComponent
      ),
  },
  {
    path: 'AuctionDetails/:id',
    loadComponent: () =>
      import(
        './components/customer/auction-details/auction-details.component'
      ).then((c) => c.AuctionDetailsComponent),
  },
];
