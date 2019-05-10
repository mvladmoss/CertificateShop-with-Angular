import { Component, OnInit } from '@angular/core';
import { SignUpService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private signUpService: SignUpService) { }

  login: string;
  password: string;
  errorMessage: string;

  signUp() {
    this.signUpService.signUp(this.login, this.password, (message: string) => {
      this.errorMessage = message;
    });
  }

  ngOnInit() {
  }

}
