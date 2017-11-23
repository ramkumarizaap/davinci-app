import {Component} from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import {ContractorService} from '../../providers/contractor-service';
import {GlobalVars} from '../../providers/globalVars';

@Component({
    selector: 'page-contractor-detail',
    templateUrl: 'contractors-detail.html'
})
export class ContractorDetailPage {
 		contractor: any;
    response:boolean = false;
 constructor( public navCtrl: NavController, public navParams: NavParams, public service: ContractorService, private globalVar:GlobalVars,public toastCtrl: ToastController) {
 		this.contractor = this.navParams.data;
 		this.response = true;
 	}
}