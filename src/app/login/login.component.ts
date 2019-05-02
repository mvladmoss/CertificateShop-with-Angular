import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;

  constructor(private loginService: LoginService) {
     
  }

  signIn() {
  console.log("you are logging in")
  this.loginService.login(this.login, this.password);
  }
 
  ngOnInit() { }

}
