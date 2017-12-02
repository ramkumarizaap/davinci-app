import {Component} from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import {ProjectService} from '../../providers/project-service';
import {GlobalVars} from '../../providers/globalVars';
import {ProjectDetailPage} from '../project-detail/project-detail';

@Component({
    selector: 'ongoing-project',
    templateUrl: 'ongoing-project.html'
})
export class OngoingProject {
 		pid: any;
 		projects:any;
    response:boolean = false;
    responsedata:boolean = false;
    // pro_response:boolean = false;
 constructor( public navCtrl: NavController, public navParams: NavParams, public service: ProjectService, private globalVar:GlobalVars,public toastCtrl: ToastController) {
 		this.pid = this.navParams.data;
         let id = this.globalVar.getId();
         let role = this.globalVar.getUserRole();
 		// this.response = true;
 		this.service.getOngoingProjects(this.pid,id,role)
            .then(res =>{
              console.log("Data:"+JSON.stringify(res));
                this.projects = res.data;
                this.responsedata = res.data;

                console.log(res.data);
                // this.loading.dismiss();
            })
            .catch(error => console.log("Error:"+error));
 	}
 	 ViewDetails(project: any,pid) {
        this.navCtrl.push(ProjectDetailPage, {project:project,cont:pid});
    }
}