import { Component } from '@angular/core';
import {NavController, AlertController, LoadingController, MenuController} from 'ionic-angular';
import { AuthService } from '../../providers/authService';
import {ProjectListPage} from '../project/project';
import {GlobalVars} from '../../providers/globalVars';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	
  userData = {"username": "","password": ""};

  constructor(public navCtrl: NavController, public authService:AuthService,private alertCtrl: AlertController,private loader:LoadingController,private menu: MenuController,private globalVar:GlobalVars) {
  
  }

  login(){

      let loading = this.loader.create({
        content: 'Loading...'
      });

      var error = "";
      if(!this.userData.username ||  !this.userData.password)
        error = "Username and Password required";

      if(error){              
        let alert = this.alertCtrl.create({
            title: 'Error',
            message: error,
            buttons: ['Ok'],
        });  
        alert.present();
        return false;
      } 

      loading.present(); 

      this.authService.postData(this.userData).then((result) => {

        loading.dismiss(); 

        if(result['status'] != undefined && result['status'] == 'SUCCESS'){

            this.globalVar.setUserdata(JSON.stringify(result['data'])); 
            //localStorage.setItem('userData', JSON.stringify(result['data']));
            this.navCtrl.setRoot(ProjectListPage);

        }else{

          let alert = this.alertCtrl.create({
              title: 'Error',
              message: result['message'],
              buttons: ['Ok'],
          });  
          alert.present();

        }

      }, (err) => {
        // Error log
      });

  }

  ionViewWillEnter() {
    // the left menu should be disabled on the login page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the left menu when leaving the login page
    this.menu.enable(true);
  }

}
