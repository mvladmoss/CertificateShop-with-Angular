import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    private _currentLang: string = "ru";

    set currentLang(newLanguage: string){
        this._currentLang = newLanguage;
    }

    get currentLang(){
        return this._currentLang;
    }

}