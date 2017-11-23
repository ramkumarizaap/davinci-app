import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController,Refresher} from 'ionic-angular';
import {ContractorService} from '../../providers/contractor-service';
import {ContractorDetailPage} from '../contractors-detail/contractors-detail';
import {GlobalVars} from '../../providers/globalVars';
@Component({
    selector: 'contractors-list',
    templateUrl: 'contractors.html'
})

export class ContractorsPage {
	contractors: Array<any>;
    responsedata:Array<any>;
    searchKey: string = "";
    loading:any

  constructor(public navCtrl: NavController, public service: ContractorService,private loader:LoadingController, private globalVar:GlobalVars,public toastCtrl: ToastController) {
      this.findAll();
      this.loading = this.loader.create();
      this.loading.present();
    }

    onInput(event) {

        if(this.searchKey)
            this.contractors = this.findByName(this.searchKey); 
        else   
            this.contractors = this.responsedata 

    }
    findByName(key:string) {
         return this.responsedata.filter((item) => {
            return item.first_name.toLowerCase().indexOf(key.toLowerCase()) > -1 || item.email1.toLowerCase().indexOf(key.toLowerCase()) > -1;
        }); 
    }

    findAll() {
      let id = this.globalVar.getId();
        this.service.getContractors(id)
            .then(res =>{
              console.log("Data:"+JSON.stringify(res));
                this.contractors = res.data;
                this.responsedata = res.data;

                console.log(res.data);
                this.loading.dismiss();
            })
            .catch(error => console.log("Error:"+error));
    }

    showContDetail(contractor: any) {
        this.navCtrl.push(ContractorDetailPage, contractor);
    }


    doRefresh(refresher: Refresher) {

        // let id = this.globalVar.getId();
        // this.service.getProjects(id,'pending').then(res =>{
        //     this.properties = res.data;
        //     this.responsedata = res.data;

        //     setTimeout(() => {
        //         refresher.complete();

        //         const toast = this.toastCtrl.create({
        //           message: 'Projects have been updated.',
        //           duration: 3000
        //         });
        //         toast.present();
        //     }, 1000);
        // })
        // .catch(error => console.log(error));
   
    }
}