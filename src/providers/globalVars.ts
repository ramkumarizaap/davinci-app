import {Injectable} from '@angular/core';
@Injectable()
export class GlobalVars {
  myGlobalVar:any;

  setUserdata(value) {
    this.myGlobalVar = localStorage.setItem('userData', value);
  }

  getUserdata() {
  	this.myGlobalVar = JSON.parse(localStorage.getItem('userData'));
    return this.myGlobalVar;
  }

  getId() {
  	this.myGlobalVar = JSON.parse(localStorage.getItem('userData'));
      return this.myGlobalVar.id
  }
  getUserRole() {
    this.myGlobalVar = JSON.parse(localStorage.getItem('userData'));
    return this.myGlobalVar.role 
  }
}