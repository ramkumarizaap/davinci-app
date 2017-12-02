import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GlobalVars} from "../providers/globalVars";
import {LoginPage} from '../pages/login/login';
import {MyaccountPage} from '../pages/myaccount/myaccount';
import {ProjectListPage} from '../pages/project/project';
import {ContractorsPage} from '../pages/contractors/contractors';
import {CompleteMilestonePage} from '../pages/complete-milestones/completed-milestone';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;
    users:any;
    appMenuItems: Array<MenuItem>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private globalVar:GlobalVars) {
        this.initializeApp();
        this.appMenuItems = [
            {title: 'Projects', component: ProjectListPage, icon: 'home'},
            {title: 'Contractors', component: ContractorsPage, icon: 'ios-people'},
            {title: 'Milestones', component: CompleteMilestonePage, icon: 'ios-albums'},
            {title: 'My Account', component: MyaccountPage, icon: 'ios-contact'}, 
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
