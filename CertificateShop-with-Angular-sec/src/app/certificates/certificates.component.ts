import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { ICertificate } from './certificate';
import { IPageData } from './page-data';
import { LoginService } from '../login/login.service';
import { ITag } from './tag';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  private errorMessage = '';
  private _listFilter = '';

  private _page: number;
  private _pageSize: number = 5;
  private _collectionSize: number;
  private _sortType: string = "Creation date";
  private _sortParameter = "dateOfCreation";
  private myCertificatesChoose: boolean;

  constructor(private restService: RestService, private loginService: LoginService) { }

  ngOnInit(): void { 
    this._page = 1;
    this._pageSize = 5;
    this.find();
  }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
  }

  filterFind() {
    this._page = 1;
    this._pageSize = 5;
    this.find();
  }

  find() {
    let params = this.performFilter();
    this.myCertificatesChoose ? this.findUserCertificates(params) : this.findAllCertificates(params);
  }

  findAllCertificates(params: any) {
    this.restService.getCertificates(this._page.toString(), this.pageSize.toString(), this._sortParameter, params)
      .then((resp: IPageData) => {
        this._collectionSize = resp.pageCount * resp.limit;
        this.filteredCertififcate = resp.pageData;
        this.certificates = resp.pageData;
      }).catch(error => {
        this.filteredCertififcate = [];
        this.certificates = [];
      });
  }

  findUserCertificates(params: any) {
    this.restService.getUserCertificates(this._page.toString(), this.pageSize.toString(), this._sortParameter, params)
      .then((resp: IPageData) => {
        this._collectionSize = resp.pageCount * resp.limit;
        this.filteredCertififcate = resp.pageData;
        this.certificates = resp.pageData;
      })
  }

  performFilter() {
    let titleRegex = this._listFilter.match(/t\((.*?)\)/);
    let titleFilter: string = titleRegex === null ? "" : titleRegex[1];
    let descriptionRegex = this._listFilter.match(/d\((.*?)\)/g);
    let descriptionFilter: string = descriptionRegex === null ? "" : descriptionRegex[1];
    let tagRegex = this._listFilter.match(/(?<=(#\()).*?(?=(\)))/g);
    let tags = tagRegex === null ? "" : tagRegex.concat();
    return {
      title: titleFilter,
      description: descriptionFilter,
      tagSet: tags
    }
  }

  get sortType() {
    return this._sortType;
  }

  set sortType(value: string) {
    switch (value) {
      case "Name": {
        this._sortParameter = "name";
        break;
      } case "Price": {
        this._sortParameter = "price";
        break;
      } case "Creation date": {
        this._sortParameter = "dateOfCreation";
        break;
      }
    }
    this.find();
  }

  clearField() {
    this._listFilter = "";
  }

  get isAuthorized() {
    return this.loginService.isUserAuthorized;
  }

  get isAdmin() {
    return this.loginService.userRole === "ROLE_ADMIN";
  }

  set pageSize(pageSize: string) {
    this._pageSize = parseInt(pageSize);
    this.find();
  }

  get pageSize() {
    return this._pageSize.toString();
  }


  onPageChanged(pagenumber: string) {
    this._page = parseInt(pagenumber);
    this.find();
  }

  filteredCertififcate: ICertificate[] = [];
  certificates: ICertificate[] = [];

  get collectionSize() {
    return this._collectionSize;
  }

  set collectionSize(value: number) {
    this._collectionSize = value;
  }

  changeCertificates() {
    this._page = 1;
    this._pageSize = 5;
    let params = this.performFilter();
    if (!this.myCertificatesChoose) {
      this.findUserCertificates(params);
      this.myCertificatesChoose = true;
    } else {
      this.findAllCertificates(params);
      this.myCertificatesChoose = false;
    }
  }

  searchByTag(tagName: string) {
    this.listFilter = "#(" + tagName + ")";
    this.filterFind();
  }

  makePurchase(certificatId: number) {
    let params = {
      certificateSet: [{
        id: certificatId
      }]
    }
    this.restService.makePurchase(params)
      .then(() => {
        this._page = 1;
        this._pageSize = 5;
        let params = this.performFilter();
        this.findUserCertificates(params);
        this.myCertificatesChoose = true;
        $("#certificatesSelect").val('My certificates').change();
      });
  }

  deleteCertificate(certificateId: number){
      this.restService.deleteCertificate(certificateId)
      .then(() => {
        this.find();
      });
  }

}
