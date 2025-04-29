import { Component } from '@angular/core';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersManagementComponent } from './components/user/users-management/users-management.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-angular-app';
  constructor(private router: Router) {}
  is_login_bage(): boolean {
    return this.router.url === '/SignUp' || this.router.url === '/Login';
  }
  is_admin_page(): boolean {
    return this.router.url === '/dashboard' || this.router.url === '/users-management';
  }
}
