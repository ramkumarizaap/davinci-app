import {Component} from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import {ContractorService} from '../../providers/contractor-service';
import {OngoingProject} from '../ongoing-project/ongoing-project';
import {GlobalVars} from '../../providers/globalVars';

@Component({
    selector: 'manager-detail',
    templateUrl: 'manager-detail.html'
})
export class MgDetailPage {
 		manager: any;
    response:boolean = false;
    // pro_response:boolean = false;
 constructor( public navCtrl: NavController, public navParams: NavParams, public service: ContractorService, private globalVar:GlobalVars,public toastCtrl: ToastController) {
 		this.manager = this.navParams.data;
 		this.response = true;
 	}
 	OngoingProjects(id){
 		this.navCtrl.push(OngoingProject,id);
 	}
}