import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(private http: HttpClient, private router: Router) { }

    login(login: string, password: string) {
        const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        let body = new HttpParams();
        body = body.set('username', login);
        body = body.set('password', password);
        body = body.set('grant_type', "password");
        body = body.set('client_id', "client");
        body = body.set('client_secret', "secret");
        return this.http
            .post(environment.url + "/oauth/token", body, {
                headers: myheader
            }).toPromise();
    }

}