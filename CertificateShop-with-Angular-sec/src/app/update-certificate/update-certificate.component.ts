import { Component, OnInit } from '@angular/core';
import { ITag } from '../certificates/tag';
import { RestService } from '../rest/rest.service';
import { IPageData } from '../certificates/page-data';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ICertificate } from '../certificates/certificate';
import { Router } from '@angular/router';
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
  private _page: number = 1;
  private _pageSize: number = 5;
  private _collectionSize: number;
  private _tagFilter: string = "";
  addForm: FormGroup;
  addFormTag: FormGroup;
  submitted = false;

  constructor(private restService: RestService, private formBuilder: FormBuilder, private router: Router) {

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
    this._page = 1;
    this._pageSize = 5;
    this.find();
  }

  get control() { return this.addForm.controls; }

  createCertificate() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.tagsToAdd.forEach(tag => delete tag.id);
    let tagSet = JSON.stringify(this.tagsToAdd);
    let certificate: ICertificate = {
      id: null,
      dateOfCreation: null,
      dateOfModification: null,
      name: this.addForm.get('title').value,
      description: this.addForm.get('description').value,
      durationInDays: this.addForm.get('duration').value,
      price: this.addForm.get('price').value,
      tags: this.tagsToAdd
    }

    this.restService.createCertificate(certificate)
      .then(() => {
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
    alert(3);
    if (this.addFormTag.invalid) {
      return;
    }
    let newTag: ITag = {
      id: null,
      name: this.addFormTag.get('tagName').value
    }
    this.restService.createTag(newTag);
    $("#closeAddTagForm").click();
  }

}
