import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient) { }

  login(data): Observable<any> {
    return this._http.post('http://localhost:3000/users/login', data);
  }
  register(data): Observable<any> {
    return this._http.post('http://localhost:3000/users/register', data);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
