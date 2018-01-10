import {Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {OngoingProject} from '../ongoing-project/ongoing-project';

@Component({
    selector: 'manager-detail',
    templateUrl: 'manager-detail.html'
})
export class MgDetailPage {
 	manager: any;
    response:boolean = false;
 	constructor( public navCtrl: NavController, public navParams: NavParams) {
 		this.manager = this.navParams.data;
 		this.response = true;
 	}
 	OngoingProjects(id){
 		this.navCtrl.push(OngoingProject,id);
 	}
}