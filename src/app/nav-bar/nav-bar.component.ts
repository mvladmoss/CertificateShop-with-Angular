import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements  OnInit {

  constructor() { }

  isAuthorized:boolean = false;
  
  ngOnInit(){
    const token = localStorage.getItem('auth_token');
    this.isAuthorized = token ? false : true;
  }

}
