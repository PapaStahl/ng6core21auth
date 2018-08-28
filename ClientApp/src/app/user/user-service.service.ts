import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from './model/register';
import { Observable } from 'rxjs';
import { Login } from './model/login';
import { TokenDto } from './model/tokenDto';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string;
  authUrl: string;
  token: TokenDto;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string)
  {
    this.apiUrl = baseUrl + 'api';
    this.authUrl = baseUrl + 'connect/token';
  }

  register(regDto: Register): Observable<any> {
    
    return this.http.post(this.apiUrl + 'user/register', regDto );
  }

  login(loginDto: Login) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let requestOptions = { headers: headers };

    
    var formData = 'grant_type=' + loginDto.grant_type
    + '&username=' + loginDto.name
    + '&password=' + loginDto.password;
    this.http.post(this.authUrl, formData, requestOptions).subscribe(
      t => {
        console.log('got token: ' + JSON.stringify(t));
        this.token = <TokenDto> t;        
        return this.token;
      },
      err => {
        return err.error;
      },
      () => {
        return this.token;
      }
    );
  }
}
