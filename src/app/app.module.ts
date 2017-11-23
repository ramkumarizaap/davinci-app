import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import {LoginPage} from '../pages/login/login';
import {MyaccountPage} from '../pages/myaccount/myaccount';
import {ProjectListPage} from '../pages/project/project';
import {ProjectDetailPage} from '../pages/project-detail/project-detail';
import {MilestoneUpdatePage} from '../pages/milestone-update/milestone-update';
import {CompleteMilestonePage} from '../pages/complete-milestones/completed-milestone';
import {ContractorsPage} from '../pages/contractors/contractors';
import {ContractorDetailPage} from '../pages/contractors-detail/contractors-detail';
import {MgDetailPage} from '../pages/manager-detail/manager-detail';
import {ManagerPage} from '../pages/manager/manager';
import {OngoingProject} from '../pages/ongoing-project/ongoing-project';
import {ViewMilestonePage,ModalViewPictures} from '../pages/view-milestone/viewmilestone';

import {GlobalVars} from "../providers/globalVars";
import {AuthService} from "../providers/authService";
import {ProjectService} from "../providers/project-service";
import {ContractorService} from "../providers/contractor-service";
import {ManagerService} from "../providers/manager-service";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MyaccountPage,
    ProjectListPage,
    ProjectDetailPage,
    ContractorDetailPage,
    ManagerPage,
    MilestoneUpdatePage,
    CompleteMilestonePage,
    ViewMilestonePage,
    ContractorsPage,
    MgDetailPage,
    OngoingProject,
    ModalViewPictures
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MyaccountPage,
    ProjectListPage,
    ProjectDetailPage,
    ContractorDetailPage,
    MilestoneUpdatePage,
    CompleteMilestonePage,
    ViewMilestonePage,
    ContractorsPage,
    ManagerPage,
    MgDetailPage,
    OngoingProject,
    ModalViewPictures
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GlobalVars,
    Camera,
    AuthService,
    ProjectService,
    ManagerService,
    ContractorService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
