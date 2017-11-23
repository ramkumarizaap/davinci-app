import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {GlobalVars} from '../../providers/globalVars';

@Component({
    selector: 'myaccount',
    templateUrl: 'myaccount.html'
})
export class MyaccountPage {

    userdata:any;

    constructor(public navCtrl: NavController, private globaVar:GlobalVars) {
        
        this.userdata = this.globaVar.getUserdata();
        console.log(this.userdata);
    }

}
