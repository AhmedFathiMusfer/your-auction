import { Routes } from '@angular/router';
import { SignUpComponent } from './components/Auth/sign-up/sign-up.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { UsersManagementComponent } from './components/user/users-management/users-management.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product/product.component';
import { AuctionComponent } from './components/auction/auction/auction.component';

export const routes: Routes = [
  {
    path: 'Dashboard',
    component: DashboardComponent,
  },
  {
    path: 'Product',
    component: ProductComponent,
  },
  {
    path: 'Auction',
    component: AuctionComponent,
  },
  {
    path: 'User',
    component: UsersManagementComponent,
  },
  {
    path: 'SignUp',
    component: SignUpComponent,
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
];
