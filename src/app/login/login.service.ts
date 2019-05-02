import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    uri = 'http://localhost:8083/oauth/token';
    token: string;

    constructor(private http: HttpClient, private router: Router) { }

    login(login: string, password: string) {
        const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        let body = new HttpParams();
        body = body.set('username', login); //chain
        body = body.set('password', password);
        body = body.set('grant_type', "password");
        body = body.set('client_id', "client");
        body = body.set('client_secret', "secret");
        this.http
            .post(this.uri, body, {
                headers: myheader
            })
            .subscribe((resp: any) => {
                localStorage.setItem('auth_token', resp.access_token);
                localStorage.setItem('refresh_token', resp.access_token);
                this.router.navigate(['welcome']);
            }
            );
    }
}