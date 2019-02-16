import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:2116/vinters_vine/resources/user/';

  constructor(private http: HttpClient) { }

  getUserbyUsrName(usrName: string): Observable<any> {
    return this.http.get(`${this.url}${usrName}`).pipe(map(results => results['User'])
    );
  }
}
