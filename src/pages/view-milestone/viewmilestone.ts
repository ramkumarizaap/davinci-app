import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ModalController, ViewController, ToastController, Refresher, Slides} from 'ionic-angular';
import {ProjectService} from '../../providers/project-service';
import {GlobalVars} from '../../providers/globalVars';

@Component({selector:'page-viewmilestone',templateUrl:'viewmilestone.html'})
export class ViewMilestonePage {

    milestone:any;
    response:boolean = false;
    processlist:any;
    imgpath:any;

    constructor( public navCtrl: NavController, public navParams: NavParams, public service: ProjectService, private globalVar:GlobalVars,public toastCtrl: ToastController,public modalCtrl: ModalController,) {

        this.milestone = this.navParams.data; 

        this.service.getCompletedMilestone(this.milestone.id).then(result =>{

            this.response = true;
            this.processlist = result.data;
            this.imgpath = result.imgpath;
        });

    }

    ViewPictures(pictures){

        pictures.name = this.milestone.name
       
        let PictureModal = this.modalCtrl.create(ModalViewPictures, {pic:pictures,imgpath:this.imgpath});

        PictureModal.onDidDismiss(data => {

            console.log(data);
        });
        PictureModal.present();
        
  }


    doRefresh(refresher: Refresher) {

        this.service.getCompletedMilestone(this.milestone.id).then(res =>{

            this.response = true;
            this.processlist = res.data;

            setTimeout(() => {
                refresher.complete();

                const toast = this.toastCtrl.create({
                  message: 'Records have been updated.',
                  duration: 3000
                });
                toast.present();
            }, 1000);
        })
        .catch(error => console.log(error));
   
    }

    
}

@Component({templateUrl: "picture-gallery.html"})
export class ModalViewPictures {
    
    @ViewChild('slides') slides: Slides;
    milestone:any;
    imgpath:any;

    constructor(public viewCtrl: ViewController,public params:NavParams){
    
        this.milestone = params.get('pic');
        this.imgpath = params.get('imgpath');
    }

    dismiss() {

        this.viewCtrl.dismiss(true);
    }
}
