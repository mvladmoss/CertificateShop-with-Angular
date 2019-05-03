import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private loginService: LoginService, private translateService: TranslateService) {
   }

  language: string = "RU";

  _isAuthorized:boolean = false;

  get selectedLanguage() {
    return this.language;
  }

  set selectedLanguage(value) {
    this.translateService.use(value.toLocaleLowerCase());
    this.language = value;
  }
  
  get isAuthorized(){
    this._isAuthorized = this.loginService.isUserAuthorized;
    return this._isAuthorized; 
  } 

}
