import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TranslateService, TranslateCompiler } from '@ngx-translate/core';
import { LanguageService } from '../nav-bar/language.service';
import { ICertificate } from '../certificates/certificate';
import { IPageData } from '../certificates/page-data';
import { ITag } from '../certificates/tag';


@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(private http: HttpClient, private router: Router, private languageService: LanguageService) { }

    login(login: string, password: string) {
        let myheader = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
        myheader = myheader.append('Accept-Language', this.languageService.currentLang);
        console.log(myheader);
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
            .set("sortBy", sortType);
        if (queryParams) {
            params = params
                .set("certDescription", queryParams.description)
                .set("certName", queryParams.title)
                .set("tagSet", queryParams.tagSet);
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

    getUserCertificates(page: string, pageSize: string, sortType: string, queryParams?): Promise<IPageData> {
        let myheader = new HttpHeaders();
        myheader = myheader.append('Accept-Language', this.languageService.currentLang)
        myheader = myheader.append('Authorization', "Bearer " + sessionStorage.getItem('auth_token'));

        let params: HttpParams = new HttpParams()
            .set("limit", pageSize)
            .set("page", page)
            .set("sortBy", sortType);
        if (queryParams) {
            params = params
                .set("certDescription", queryParams.description)
                .set("certName", queryParams.title);
        }
        return this.http
            .get<IPageData>(environment.url + "/users/certificates", {
                params,
                headers: myheader
            }).toPromise();
    }

    getTags(page: string, pageSize: string, tagName): Promise<IPageData> {
        let myheader = new HttpHeaders();
        myheader = myheader.append('Accept-Language', this.languageService.currentLang)
        myheader = myheader.append('Authorization', "Bearer " + sessionStorage.getItem('auth_token'));
        let params: HttpParams = new HttpParams()
            .set("limit", pageSize)
            .set("page", page)
        if (tagName) {
            params = params
                .set("tagName", tagName)
        }
        return this.http
            .get<IPageData>(environment.url + "/tags", {
                params,
                headers: myheader
            }).toPromise();
    }

    createCertificate(certificate: ICertificate): Promise<ICertificate> {
        let myheader = new HttpHeaders();
        myheader = myheader.append('Accept-Language', this.languageService.currentLang)
        myheader = myheader.append('Authorization', "Bearer " + sessionStorage.getItem('auth_token'));
        return this.http
            .post<ICertificate>(environment.url + "/certificates", certificate, {
                headers: myheader
            }).toPromise();
    }

    createTag(tag: ITag) {
        let myheader = new HttpHeaders();
        myheader = myheader.append('Accept-Language', this.languageService.currentLang)
        myheader = myheader.append('Authorization', "Bearer " + sessionStorage.getItem('auth_token'));
        return this.http
            .post<ICertificate>(environment.url + "/tags", tag, {
                headers: myheader
            }).toPromise();
    }

}