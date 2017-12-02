import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {GlobalVars} from '../../providers/globalVars';

@Component({
    selector: 'myaccount',
    templateUrl: 'myaccount.html'
})
export class MyaccountPage {

    userdata:any;
    title:any;

    constructor(public navCtrl: NavController,  public navParams: NavParams,private globaVar:GlobalVars) {
         this.title = "My Account";
         if(Object.keys(this.navParams.data).length > 1)
         {
            var user = this.navParams.data;
            if(Object.keys(user.user).length > 1)
            {
                this.title = this.navParams.data.type+' Account';
                this.userdata = user.user;
            }
         }
        else
        {
        	this.userdata = this.globaVar.getUserdata();
        }
    }

}
