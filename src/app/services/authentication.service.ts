import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from './user.service';
import { MatTableDataSource } from '@angular/material';
import { User } from '../classes/user';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
  user: User;

  constructor(private storage: Storage
    , private plt: Platform
    , private userSvc: UserService) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
   }

  login(usrName: string, usrPwd: String)  {
      // Call user service function which returns an Observable
      this.user = this.userSvc.getUserbyUsrName(usrName);

    console.log(this.user);

    return this.storage.set(TOKEN_KEY, 'Bearer 123456').then(res => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkToken() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
      this.authenticationState.next(true);
      }
    });
  }
}
