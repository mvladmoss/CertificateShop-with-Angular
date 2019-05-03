import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest/rest.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    isUserAuthorized: boolean = false;

    public setUserAuthorized(flag: boolean) {
        this.isUserAuthorized = flag;
    };

    constructor(private router: Router, private restService: RestService) { }

    login(login: string, password: string) {
        this.restService.login(login, password)
            .then((resp: any) => {
                this.isUserAuthorized = true;
                sessionStorage.setItem('auth_token', resp.access_token);
                sessionStorage.setItem('refresh_token', resp.access_token);
                this.router.navigate(['welcome']);
            }
            ).catch(error => {
                alert("error");
                throw error;
            }).then(() => { alert("after") });
    }

    logout() {
        this.isUserAuthorized = false;
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('refresh_token');
        this.router.navigate(['welcome']);
    }
}