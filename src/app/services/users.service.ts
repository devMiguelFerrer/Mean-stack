import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';

import { User } from '../models/User.interface';
import { Response } from '../models/Response.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private URL = 'https://mean-stack81.herokuapp.com/api';
  private listUsers: User[];
  listUsersUpdate = new Subject<User[]>();
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * METHOD GET PUBLIC
   * @example this.userService.getListUsers();
   * @returns void
   * @description Fetch data and send to listeners
   */
  getListUsers(): void {
    this.http.get(`${this.URL}`).subscribe(
      (resp: Response) => {
        if (resp.success) {
          this.listUsers = resp.data;
          this.listUsersUpdate.next([...this.listUsers]);
        } else {
          this.listUsersUpdate.next([]);
        }
      },
      err => {
        this.showMessage(err.error.error);
        this.getListUsers();
      }
    );
  }

  /**
   * METHOD POST PUBLIC (Should be private)
   * @param user User
   * @example {
   *  name: string;
   *  age: number;
   *  email: string;
   *  desc: string;
   * }
   * @description Add a new user to DB
   * @returns void
   */
  addUser(user: User): void {
    this.http
      .post(`${this.URL}`, JSON.stringify(user), this.httpOptions)
      .subscribe(
        (respAddUser: Response) => {
          if (respAddUser.success) {
            this.getListUsers();
            this.showMessage('Se guardo el usuario correctamente');
            this.router.navigate(['/list']);
          } else {
            this.showMessage(respAddUser.error);
          }
          this.getListUsers();
          this.showMessage('Se guardo el usuario correctamente');
          this.router.navigate(['/list']);
        },
        err => {
          this.showMessage(err.error.error);
        }
      );
  }

  /**
   * METHOD DELETE PUBLIC (Should be private)
   * @param id string
   * @description Remove a user from DB
   * @returns void
   */
  deleteUser(id: string): void {
    this.http.delete(`${this.URL}/${id}`, this.httpOptions).subscribe(
      (respDeleteUser: Response) => {
        if (respDeleteUser.success) {
          this.showMessage(respDeleteUser.message);
          this.getListUsers();
        } else {
          this.showMessage(respDeleteUser.error);
        }
      },
      err => {
        this.showMessage(err.error.error);
        this.getListUsers();
      }
    );
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, null, {
      duration: 4000
    });
  }

  /**
   * METHOD PUT PUBLIC (Should be private)
   * @param user User
   * @description Update a user from DB
   * @returns void
   */
  updateUser(user: User): void {
    this.http.put(`${this.URL}/${user._id}`, user, this.httpOptions).subscribe(
      (respUpdateUser: Response) => {
        if (respUpdateUser.success) {
          this.showMessage(respUpdateUser.message);
          this.getListUsers();
        } else {
          this.showMessage(respUpdateUser.error);
        }
      },
      err => {
        this.showMessage(err.error.error);
      }
    );
  }

  /**
   * METHOD DELETE/RESET DB PUBLIC (Should be private)
   * @param miguel string
   * @description Reset data of DB
   * @returns void
   */
  resetDB(): void {
    this.http.delete(`${this.URL}/db/dev`, this.httpOptions).subscribe(
      (respResetDB: Response) => {
        if (respResetDB.success) {
          this.showMessage(respResetDB.message);
          this.getListUsers();
        } else {
          this.showMessage(respResetDB.error);
        }
      },
      err => {
        this.showMessage(err.error.error);
        this.getListUsers();
      }
    );
  }
}
