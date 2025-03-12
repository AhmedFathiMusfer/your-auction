import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import IUser from '../../../Models/User/IUser';
import { UserServiceService } from '../../../services/user-service.service';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-users-management',
  imports: [NgClass, NgFor, AddUserComponent],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css',
})
export class UsersManagementComponent {
  users: IUser[];

  constructor(private _userService: UserServiceService) {
    this.users = _userService.getUser();
  }
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
