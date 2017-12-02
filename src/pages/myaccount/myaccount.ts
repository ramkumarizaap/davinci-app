import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {GlobalVars} from '../../providers/globalVars';

@Component({
    selector: 'myaccount',
    templateUrl: 'myaccount.html'
})
export class MyaccountPage {

    userdata:any;

    constructor(public navCtrl: NavController,  public navParams: NavParams,private globaVar:GlobalVars) {
        var user = this.navParams.data;
        console.log(Object.keys(user).length);
        if(Object.keys(user).length > 1)
        	this.userdata = user;
        else
        	this.userdata = this.globaVar.getUserdata();
        console.log(Object.keys(this.userdata).length);
    }

}
