import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  private url = 'http://localhost:2116/vinters-vine/resources/user/';

  constructor(private http: HttpClient) { }

  getUserbyUsrName(usrName: string): any {
    return this.http.get(this.url || usrName);
  }
}
