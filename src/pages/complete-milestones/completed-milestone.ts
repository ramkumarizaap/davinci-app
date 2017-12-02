import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController,Refresher} from 'ionic-angular';
import {ProjectService} from '../../providers/project-service';
import {ProjectDetailPage} from '../project-detail/project-detail';
import {GlobalVars} from '../../providers/globalVars';

@Component({
    selector: 'page-complete-milestone',
    templateUrl: 'completed-milestone.html'
})
export class CompleteMilestonePage {

    properties: Array<any>;
    responsedata:Array<any>;
    searchKey: string = "";
    loading:any

    constructor(public navCtrl: NavController, public service: ProjectService,private loader:LoadingController, private globalVar:GlobalVars,public toastCtrl: ToastController) {
        this.findAll();
        this.loading = this.loader.create();
        this.loading.present();
    }

    openProjectDetail(property: any) {
        this.navCtrl.push(ProjectDetailPage, {project:property,cont:'',upbtn:false});
    }

    onInput(event) {

        if(this.searchKey)
            this.properties = this.findByName(this.searchKey); 
        else   
            this.properties = this.responsedata 

    }

    findByName(key:string) {
         return this.responsedata.filter((item) => {
            return item.project_name.toLowerCase().indexOf(key.toLowerCase()) > -1;           
        }); 
    }

    findAll() {
        let id = this.globalVar.getId();
        let role = this.globalVar.getUserRole();
        this.service.getProjects(id,'complete',role)
            .then(res =>{
                this.properties = res.data;
                this.responsedata = res.data;

                this.loading.dismiss();
            })
            .catch(error => console.log(error));
    }

    doRefresh(refresher: Refresher) {

        let id = this.globalVar.getId();
        let role = this.globalVar.getUserRole();
        this.service.getProjects(id,'complete',role).then(res =>{
            this.properties = res.data;
            this.responsedata = res.data;

            setTimeout(() => {
                refresher.complete();

                const toast = this.toastCtrl.create({
                  message: 'Projects have been updated.',
                  duration: 3000
                });
                toast.present();
            }, 1000);
        })
        .catch(error => console.log(error));
   
    }

}
