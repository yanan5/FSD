import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthenticationService {

  constructor(private _http: HttpClient) { }

  authenticateUser(data): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>('http://localhost:3000/auth/v1/', data);
  }

  isUserAuthenticated(token): Promise<boolean> {
    return this._http.post('http://localhost:3000/auth/v1/isAuthenticated', {}, {
      headers: new HttpHeaders({'Authorization' : `Bearer ${token}`})
    })
    .map(res => res['isAuthenticated'])
    .toPromise();
  }

  setBearerToken(token): void {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken(): String {
    return localStorage.getItem('bearerToken');
  }
}
