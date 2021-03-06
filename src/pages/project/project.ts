import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController,Refresher} from 'ionic-angular';
import {ProjectService} from '../../providers/project-service';
import {ProjectDetailPage} from '../project-detail/project-detail';
import {LoginPage} from '../login/login';
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
        
    }

    ngOnInit(){

        this.users = this.globalVar.getUserdata();

        if(this.users === null){
            this.navCtrl.setRoot(LoginPage);
        }else{

            this.findAll();
            this.loading = this.loader.create();
            this.loading.present();
        }
    }    
    

    openProjectDetail(property: any) {
        this.navCtrl.push(ProjectDetailPage, {project:property,cont:''});
    }

    onInput(event) {

        if(this.searchKey)
            this.properties = this.findByName(this.searchKey); 
        else   
            this.properties = this.responsedata 

    }

    findByName(key:string) {
         return this.responsedata.filter((item) => {
            return item.project_name.toLowerCase().indexOf(key.toLowerCase()) > -1 || item.project_address.toLowerCase().indexOf(key.toLowerCase()) > -1;           
        }); 
    }

    findAll() {
        let id = this.globalVar.getId();
        let role = this.globalVar.getUserRole();
        this.service.getProjects(id,'pending',role)
            .then(res =>{
                this.properties = res.data;
                this.responsedata = res.data;

                console.log(res);
                this.loading.dismiss();
            })
            .catch(error =>{console.log(error)});
    }

    doRefresh(refresher: Refresher) {

        let id = this.globalVar.getId();
        let role = this.globalVar.getUserRole();
        this.service.getProjects(id,'pending',role).then(res =>{
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
