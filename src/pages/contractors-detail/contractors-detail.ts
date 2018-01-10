import {Component} from '@angular/core';
import { NavController, NavParams,} from 'ionic-angular';
import {OngoingProject} from '../ongoing-project/ongoing-project';

@Component({
    selector: 'page-contractor-detail',
    templateUrl: 'contractors-detail.html'
})
export class ContractorDetailPage {
 	contractor: any;
    response:boolean = false;
    
    constructor( public navCtrl: NavController, public navParams: NavParams) {
 		this.contractor = this.navParams.data;
 		this.response = true;
 	}
 		OngoingProjects(id){
 		this.navCtrl.push(OngoingProject,id);
 	}
}