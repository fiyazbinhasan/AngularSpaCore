import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { User, users } from '../user-models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [
    `
      .fab-container {
        text-align: right;
        margin: 5px;
      }
    `
  ]
})
export class UserListComponent {
  isLoading = false;
  selectedUser: User;
  users: User[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        this.isLoading = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  select(selectedUser: User) {
    this.selectedUser = selectedUser;
  }

  onAddButtonClicked() {
    this.selectedUser = {
      id: undefined,
      name: '',
      avatar: ''
    };
  }

  onCreated(user: User) {
    this.users.push(user);
  }

  onUpdated(user: User) {
    const oldUser = this.users.find(u => u.id === user.id);
    Object.assign(oldUser, user);
  }
}
