import {Component} from '@angular/core';
import { NavController, NavParams, ToastController, Refresher} from 'ionic-angular';
import {ProjectService} from '../../providers/project-service';
import {GlobalVars} from '../../providers/globalVars';
import {MilestoneUpdatePage} from '../milestone-update/milestone-update';
import {ViewMilestonePage} from '../view-milestone/viewmilestone';
import {MyaccountPage} from '../myaccount/myaccount';

@Component({
    selector: 'page-project-detail',
    templateUrl: 'project-detail.html'
})
export class ProjectDetailPage {

    project: any;
    milestones:any;
    super:any;
    managers:any;
    response:boolean = false;
    title:string;
    cont:string = "";
    updatebtn:boolean = true;
    prodetail:boolean = true;

    constructor( public navCtrl: NavController, public navParams: NavParams, public service: ProjectService, private globalVar:GlobalVars,public toastCtrl: ToastController) {

        this.project = this.navParams.data.project;
        console.log(this.navParams.data);
        if(this.navParams.data.cont!='')
        {
          this.cont = this.navParams.data.cont;
           this.prodetail = false;
        }
        if(this.navParams.data.upbtn==false)
          this.updatebtn = false;
        let contid = this.globalVar.getId();
        if(this.project.type == 'pending')
            this.title = 'Project Milestones';
        else
            this.title = 'Milestones';    
        this.service.getMilestones(this.project.id,contid,this.project.type,this.cont).then(result =>{

            this.response = true;
            this.milestones = result.data;
            this.managers = result.managers;
            this.super = result.super;
            console.log(this.managers);
        });
    }

    updateMilestoneStatus(detail) {
        this.navCtrl.push(MilestoneUpdatePage, detail);
    }

    ViewCompletedItems(milestone) {
        this.navCtrl.push(ViewMilestonePage, milestone);
    }

    doRefresh(refresher: Refresher) {

        let contid = this.globalVar.getId();

        this.service.getMilestones(this.project.id,contid,this.project.type,this.cont).then(res =>{

            this.response = true;
            this.milestones = res.data;

            setTimeout(() => {
                refresher.complete();

                const toast = this.toastCtrl.create({
                  message: 'Milestones list have been updated.',
                  duration: 3000
                });
                toast.present();
            }, 1000);
        })
        .catch(error => console.log(error));
   
    }
     showUserDetail(user: any,type:any) {
        this.navCtrl.push(MyaccountPage, {user:user,type:type});
    }

    
}
