import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = `${environment.apiUrl}user`;

  constructor(private httpClient: HttpClient) { }

  registerUser(newUserForm): Observable<User> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Orgin': '*'
      })
    };
    return this.httpClient.post<User>(this.userUrl, newUserForm, httpHead);
  }

  loginUser(userForm): Observable<User> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Orgin': '*'
      })
    };
    return this.httpClient.post<User>(`${this.userUrl}/login`, userForm, httpHead);
  }
}
