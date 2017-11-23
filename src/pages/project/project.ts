import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController,Refresher} from 'ionic-angular';
import {ProjectService} from '../../providers/project-service';
import {ProjectDetailPage} from '../project-detail/project-detail';
import {GlobalVars} from '../../providers/globalVars';

@Component({
    selector: 'page-project-list',
    templateUrl: 'project.html'
})
export class ProjectListPage {

    properties: Array<any>;
    responsedata:Array<any>;
    searchKey: string = "";
    loading:any;
    users:any;

    constructor(public navCtrl: NavController, public service: ProjectService,private loader:LoadingController, private globalVar:GlobalVars,public toastCtrl: ToastController) {
        this.users = this.globalVar.getUserdata();
        console.log(this.users);
        this.findAll();
        this.loading = this.loader.create();
        this.loading.present();
    }

    openProjectDetail(property: any) {
        this.navCtrl.push(ProjectDetailPage, property);
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
        this.service.getProjects(id,'pending')
            .then(res =>{
                this.properties = res.data;
                this.responsedata = res.data;

                console.log(res.data);
                this.loading.dismiss();
            })
            .catch(error => console.log(error));
    }

    doRefresh(refresher: Refresher) {

        let id = this.globalVar.getId();
        this.service.getProjects(id,'pending').then(res =>{
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
