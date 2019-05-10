import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest/rest.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../login/login.service';
import { log } from 'util';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {

    isUserAuthorized: boolean = false;

    public setUserAuthorized(flag: boolean) {
        this.isUserAuthorized = flag;
    };

    constructor(private router: Router, private restService: RestService, private translateService: TranslateService, private loginService: LoginService) { }

    signUp(login: string, password: string, callback: Function) {
        this.restService.signUp(login, password)
            .then((resp: any) => {
                this.loginService.login(login, password,() =>{});
            }).catch(error => {
                callback(error.error.errorMessage);
            });
    }
}