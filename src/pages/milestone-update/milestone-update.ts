import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import {ProjectService} from '../../providers/project-service';
import {GlobalVars} from '../../providers/globalVars';

@Component({
    selector: 'page-milestone-update',
    templateUrl: 'milestone-update.html'
})
export class MilestoneUpdatePage {

    milestone: any;
    contractor_id:any;
    formData:any = {Work_item:'',room:'',status:'',description:'',photos:''};
    workitems:any;
    rooms:any;
    isdataAvailable:boolean = false;
    submitted = false;
    base64image:string;
    photos:any = [];

    constructor( public navCtrl: NavController, public navParams: NavParams,private camera: Camera, public service: ProjectService, private globalVar:GlobalVars,private loader:LoadingController,private alertCtrl: AlertController) {

        this.milestone = this.navParams.data;
        this.contractor_id = this.globalVar.getId();

        this.formData.id = this.milestone.id;

        this.service.getWorkItems(this.milestone.project_id).then(result =>{

            this.isdataAvailable = true;
            this.workitems=result.work_items;
            this.rooms=result.rooms;

        });

    }

    takePhoto(){

        if(this.photos.length > 4){

            let alert = this.alertCtrl.create({
                    title: 'Information',
                    message: "Four pictures only allowed to capture it!",
                    buttons: ['OK'],
                });  
                alert.present();
        }
        else
        {

            const options: CameraOptions = {
              quality: 60,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              correctOrientation:true
              
            }

            this.camera.getPicture(options).then((imageData) => {
                this.base64image = 'data:image/jpeg;base64,' + imageData;
                this.photos.push(this.base64image);
                this.photos.reverse();

            },(err) => {
                console.log(err);
            });
        }   
    }

    deletePhoto(index){
       this.photos.splice(index, 1);
    }

    updateStatus(form: NgForm){

        let loading = this.loader.create();

        this.submitted = true;

        this.formData.photos = this.photos;

        if (form.valid) {

            loading.present(); 

            this.service.updateMilestoneStatus(this.formData).then(result =>{

                loading.dismiss();

                let alert = this.alertCtrl.create({
                    title: 'Success',
                    message: "Milestone updated successfully!",
                    buttons: [{
                              text: 'OK',
                              handler: () => {
                                this.navCtrl.pop();
                              }
                            }],
                });  
                alert.present();

            });
        }
    }
    
}
