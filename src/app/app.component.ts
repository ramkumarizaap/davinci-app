import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GlobalVars} from "../providers/globalVars";
import {LoginPage} from '../pages/login/login';
import {MyaccountPage} from '../pages/myaccount/myaccount';
import {ProjectListPage} from '../pages/project/project';
import {ContractorsPage} from '../pages/contractors/contractors';
import {ManagerPage} from '../pages/manager/manager';
import {CompleteMilestonePage} from '../pages/complete-milestones/completed-milestone';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
    hidden:boolean
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = ManagerPage;
    users:any;
    menu1:boolean;menu2:boolean;menu3:boolean;menu4:boolean;menu5:boolean;
    appMenuItems: Array<MenuItem>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private globalVar:GlobalVars) {
        this.initializeApp();
        this.users = this.globalVar.getUserdata();
        if(this.users.role=='3')
            this.menu1 = true;
        if(this.users.role=='2')
            this.menu2 = true;
        this.appMenuItems = [
            {title: 'Projects', component: ProjectListPage, icon: 'home',hidden:this.menu1},
            {title: 'Project Manager', component: ManagerPage, icon: 'logo-buffer',hidden:this.menu2},
            {title: 'Contractors', component: ContractorsPage, icon: 'ios-people',hidden:this.menu3},
            {title: 'Milestones', component: CompleteMilestonePage, icon: 'ios-albums',hidden:this.menu4},
            {title: 'My Account', component: MyaccountPage, icon: 'ios-contact',hidden:this.menu5}, 
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    public logOut() {
        localStorage.removeItem('userData');
        this.nav.setRoot(LoginPage);

    }
}
