import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;
  errorMessage: string;

  constructor(private loginService: LoginService) {

  }

  signIn() {
    this.loginService.login(this.login, this.password, (message: string) => {
      this.errorMessage = message;
    });
  }

  ngOnInit() { }


}
