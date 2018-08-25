import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from './model/register';
import { Observable } from 'rxjs';
import { Login } from './model/login';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string)
  {
    this.apiUrl = baseUrl + 'api/';
  }

  register(regDto: Register): Observable<any> {
    
    return this.http.post(this.apiUrl + 'user/register', regDto );
  }

  login(loginDto: Login): Observable<any> {

    return this.http.post(this.apiUrl + 'user/login', loginDto);
  }
}
