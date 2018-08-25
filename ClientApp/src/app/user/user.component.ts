import { Component, OnInit } from '@angular/core';
import { UserService } from './user-service.service';
import { Register } from './model/register';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Login } from './model/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userSvc: UserService
    , private router: Router) { }

  RegisterDto: Register
  LoginDto: Login;

  Message: string;

  ngOnInit() {
    this.RegisterDto = new Register();
    this.LoginDto = new Login();
  }

  registerClick() {
    this.userSvc.register(this.RegisterDto).subscribe(
      s => { this.Message = s; },
      error => { this.Message = JSON.stringify(error); },
      () => { console.log('register done'); }
    );
  }

  loginClick() {
    this.userSvc.login(this.LoginDto).subscribe(
      s => {
        console.log('redirecting to fetch-data')
        this.router.navigate(['fetch-data']);
      },
      error => { this.Message = JSON.stringify(error); },
      () => { console.log('login done'); }
    );
  }

}
