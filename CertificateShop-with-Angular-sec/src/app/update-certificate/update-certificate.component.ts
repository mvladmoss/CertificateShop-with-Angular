import { Component, OnInit } from '@angular/core';
import { ITag } from '../certificates/tag';
import { RestService } from '../rest/rest.service';
import { IPageData } from '../certificates/page-data';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ICertificate } from '../certificates/certificate';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from "jquery"

@Component({
  selector: 'app-update-certificate',
  templateUrl: './update-certificate.component.html',
  styleUrls: ['./update-certificate.component.css']
})
export class UpdateCertificateComponent implements OnInit {

  private tags: ITag[] = [];
  private tagsToAdd: ITag[] = [];
  private error: string;
  private tagError: string;
  private _page: number = 1;
  private _pageSize: number = 5;
  private _collectionSize: number;
  private _tagFilter: string = "";
  private addForm: FormGroup;
  private addFormTag: FormGroup;
  private submitted = false;
  private isUpdate: boolean;
  private currentCertificateId: number;

  constructor(private restService: RestService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(5), Validators.maxLength(15)]],
      description: ['', [Validators.minLength(10), Validators.maxLength(250), Validators.required]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]+(.[0-9]{1,5})?$")]],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(1000)]]
    });
    this.addFormTag = this.formBuilder.group({
      tagName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    });

    this.route.params.subscribe(params => {
      let certificateId = +params['certificateId'];
      if (certificateId) {
        this.isUpdate = true;
        this.currentCertificateId = certificateId;
        this.restService.getCertificateById(certificateId).then(certificate => {
          this.addForm.get('title').setValue(certificate.name);
          this.addForm.get('description').setValue(certificate.description);
          this.addForm.get('price').setValue(certificate.price);
          this.addForm.get('duration').setValue(certificate.durationInDays);
          this.tagsToAdd = certificate.tags;
        });
      }

    })
    this._page = 1;
    this._pageSize = 5;
    this.find();
  }


  createCertificate() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.tagsToAdd.forEach(tag => delete tag.id);
    let tagSet = JSON.stringify(this.tagsToAdd);
    let certificate: ICertificate = {
      id: this.currentCertificateId,
      dateOfCreation: null,
      dateOfModification: null,
      name: this.addForm.get('title').value,
      description: this.addForm.get('description').value,
      durationInDays: this.addForm.get('duration').value,
      price: this.addForm.get('price').value,
      tags: this.tagsToAdd
    }
    console.log(certificate);
    
    let promise: Promise<ICertificate> = this.isUpdate ? this.restService.updateCertificate(certificate) : this.restService.createCertificate(certificate);
    promise.then(() => {
      this.router.navigate(['certificates']);
    })
      .catch(error => {
        alert("error");
        if (error.status === 400) {
          this.error = error.error.errorMessage;
        }
      });
  }

  find() {
    this.restService.getTags(this._page.toString(), this._pageSize.toString(), this.tagFilter)
      .then((resp: IPageData) => {
        this._collectionSize = resp.pageCount * resp.limit;
        this.tags = resp.pageData;
      });
  }

  onPageChanged(pagenumber: string) {
    this._page = parseInt(pagenumber);
    this.find();
  }

  get tagFilter() {
    return this._tagFilter;
  }

  set tagFilter(value: string) {
    this._tagFilter = value;
    this.find();
  }

  addTag(tag: ITag) {
    if (!this.tagsToAdd.includes(tag)) {
      this.tagsToAdd.push(tag);
    }
  }

  deleteTag(tag: ITag) {
    var index = this.tagsToAdd.indexOf(tag, 0);
    if (index > -1) {
      this.tagsToAdd.splice(index, 1);
    }
  }

  createTag() {
    if (this.addFormTag.invalid) {
      return;
    }
    let newTag: ITag = {
      id: null,
      name: this.addFormTag.get('tagName').value
    }
    this.restService.createTag(newTag)
      .then(() => {
        $(
          "#closeAddTagForm").click();
        this.addFormTag.get('tagName').setValue("");
        this.tagError = "";
      })
      .catch(error => {
        this.tagError = error.error.errorMessage;
        return;
      });
  }

}
