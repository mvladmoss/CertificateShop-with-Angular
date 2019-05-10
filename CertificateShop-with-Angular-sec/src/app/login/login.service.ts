import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest/rest.service';
import { TranslateService } from '@ngx-translate/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private _isUserAuthorized: boolean = false;
    private _userName: string;
    private _userRole: string;

    constructor(private router: Router, private restService: RestService, private translateService: TranslateService) { }

    login(login: string, password: string, callback: Function) {
        this.restService.login(login, password)
            .then((resp: any) => {
                this.isUserAuthorized = true;
                sessionStorage.setItem('auth_token', resp.access_token);
                sessionStorage.setItem('refresh_token', resp.access_token);
                const jwtHelper = new JwtHelperService();
                const decodedToken = jwtHelper.decodeToken(resp.access_token);
                this._userRole = decodedToken.authorities[0];
                this._userName = decodedToken.user_name;
                this.router.navigate(['welcome']);
            }
            ).catch(error => {
                if (error.status === 400) {
                    this.translateService.get('loginError').
                        pipe().subscribe((value) => callback(value));
                    return;
                } else {
                    this.translateService.get('unknowError').
                        pipe().subscribe((value) => callback(value));
                    return;
                }
            });
    }

    get userRole(){
        return this._userRole;
    }

    logout() {
        this.isUserAuthorized = false;
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('refresh_token');
        this.router.navigate(['welcome']);
        this._userName = null;
    }

    set isUserAuthorized(value: boolean) {
        this._isUserAuthorized = value;
    }

    get isUserAuthorized() {
        return this._isUserAuthorized;
    }

    get userName() {
        return this._userName;
    }
}