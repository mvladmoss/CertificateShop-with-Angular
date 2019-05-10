import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TranslateService, TranslateCompiler } from '@ngx-translate/core';
import { LanguageService } from '../nav-bar/language.service';
import { ICertificate } from '../certificates/certificate';
import { IPageData } from '../certificates/page-data';


@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(private http: HttpClient, private router: Router, private languageService: LanguageService) { }

    login(login: string, password: string) {
        const myheader = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
        myheader.set('Accept-Language', this.languageService.currentLang);
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

    getCertificates(page: string, pageSize: string, sortType: string, queryParams?): Promise<IPageData> {
        const myheader = new HttpHeaders();
        myheader.set('Accept-Language', this.languageService.currentLang);
        let params: HttpParams = new HttpParams()
            .set("limit", pageSize)
            .set("page", page)
            .set("sortBy",sortType);
        if (queryParams) {
            params = params
                .set("certDescription", queryParams.description)
                .set("certName", queryParams.title);
        }
        return this.http
            .get<IPageData>(environment.url + "/certificates", {
                params,
                headers: myheader
            }).toPromise();
    }

    signUp(login: string, password: string) {
        let myheader: HttpHeaders = new HttpHeaders();
        myheader = myheader.append('Content-Type', 'application/json');
        myheader = myheader.append('Accept-Language', this.languageService.currentLang);
        let body = {
            login: login,
            password: password
        };
        return this.http
            .post(environment.url + "/users", body, {
                headers: myheader
            }).toPromise();
    }

}