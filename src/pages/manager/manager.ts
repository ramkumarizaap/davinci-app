import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {ManagerService} from '../../providers/manager-service';
import {MgDetailPage} from '../manager-detail/manager-detail';
import {GlobalVars} from '../../providers/globalVars';
@Component({
    selector: 'manager-list',
    templateUrl: 'manager.html'
})

export class ManagerPage {
	  manager: Array<any>;
    responsedata:Array<any>;
    searchKey: string = "";
    loading:any

  constructor(public navCtrl: NavController, public service: ManagerService,private loader:LoadingController, private globalVar:GlobalVars) {
      this.findAll();
      this.loading = this.loader.create();
      this.loading.present();
    }
    onInput(event) {

        if(this.searchKey)
            this.manager = this.findByName(this.searchKey); 
        else   
            this.manager = this.responsedata 

    }
    findByName(key:string) {
         return this.responsedata.filter((item) => {
            return item.first_name.toLowerCase().indexOf(key.toLowerCase()) > -1 || item.email.toLowerCase().indexOf(key.toLowerCase()) > -1;
        }); 
    }
    findAll() {
      let id = this.globalVar.getId();
      let role = this.globalVar.getUserRole();
        this.service.getManager(id,role)
            .then(res =>{
                this.manager = res.data;
                this.responsedata = res.data;

                this.loading.dismiss();
            })
            .catch(error => console.log("Error:"+error));
    }
    showMgDetail(manager: any) {
        this.navCtrl.push(MgDetailPage, manager);
    }
}