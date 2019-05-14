import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private loginService: LoginService, private translateService: TranslateService, private languageService: LanguageService) {
   }

  language: string = "RU";

  _isAuthorized:boolean = false;
  _userName: string;

  get selectedLanguage() {
    return this.language;
  }

  set selectedLanguage(value) {
    this.translateService.use(value.toLocaleLowerCase());
    this.languageService.currentLang = value;
    this.language = value;
  }

  get userName() {
    return this.loginService.userName;
  }

  get isAdmin(){
    return this.loginService.userRole === "ROLE_ADMIN";
  }

  
  get isAuthorized(){
    this._isAuthorized = this.loginService.isUserAuthorized;
    return this._isAuthorized; 
  } 

}
