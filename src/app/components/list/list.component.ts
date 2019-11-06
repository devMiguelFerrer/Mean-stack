import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UsersService } from './../../services/users.service';
import { User } from 'src/app/models/User.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  listUsers: User[];
  listUsersSubscription: Subscription;
  userControl: FormGroup;
  private tempUser: User;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getListUsers();
    this.listUsersSubscription = this.userService.listUsersUpdate.subscribe(
      (respServiceUsers: User[]) => {
        this.listUsers = respServiceUsers;
      }
    );
    this.listUsers = [];
  }

  onEditUser() {
    this.userService.updateUser(this.userControl.value);
    this.tempUser.show = false;
  }

  onDeleteUser(idUser: string) {
    this.userService.deleteUser(idUser);
  }

  onChangeView(user: User): void {
    if (this.tempUser !== undefined) {
      this.userControl = null;
      this.tempUser.show = false;
      this.tempUser = null;
    }
    if (!user.show) {
      this.tempUser = user;
      this.userControl = new FormGroup({
        name: new FormControl(user.name, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]),
        email: new FormControl(user.email, [
          Validators.required,
          Validators.email,
          Validators.minLength(10),
          Validators.maxLength(30)
        ]),
        age: new FormControl(user.age, [
          Validators.required,
          Validators.min(18),
          Validators.max(99)
        ]),
        desc: new FormControl(user.desc, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(140)
        ]),
        _id: new FormControl(user._id)
      });
      user.show = true;
    } else {
      user.show = false;
    }
  }

  ngOnDestroy() {
    this.listUsersSubscription.unsubscribe();
  }
}
