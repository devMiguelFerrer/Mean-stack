import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  userControl = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(10),
      Validators.maxLength(30)
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(99)
    ]),
    desc: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(140)
    ])
  });

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {}

  onAddUser(): void {
    this.userService.addUser(this.userControl.value);
  }
  onCancel(): void {
    this.router.navigate(['/list']);
  }
}
