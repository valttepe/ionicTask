import { SearchPage } from './../pages/search/search';
import { ProfilePage } from './../pages/profile/profile';
import { UploadPage } from './../pages/upload/upload';
import { RegisterPage } from './../pages/register/register';
import { FrontPage } from './../pages/front/front';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FrontPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();
    this.menuPages();

    // used for an example of ngFor and navigation
    
    /*if (localStorage.getItem("user") != null) {
      this.pages = [
        { title: 'Front', component: FrontPage },
        { title: 'Upload', component: UploadPage },
        { title: 'Profile', component: ProfilePage },
        { title: 'Search', component: SearchPage}
      ];
    }
    else {
      this.pages = [

        { title: 'Front', component: FrontPage },
        { title: 'Login', component: LoginPage },
        { title: 'Register', component: RegisterPage}

      ];
    }*/
    /*this.pages = [

        { title: 'Login', component: LoginPage },
        { title: 'Front', component: FrontPage },
        { title: 'Upload', component: UploadPage },
        { title: 'Register', component: RegisterPage},
        { title: 'Profile', component: ProfilePage}

      ];*/
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  menuPages() {
    console.log('listing pages');
    if (localStorage.getItem("user") != null) {
      this.pages = [
        { title: 'Front', component: FrontPage },
        { title: 'Upload', component: UploadPage },
        { title: 'Profile', component: ProfilePage },
        { title: 'Search', component: SearchPage}
      ];
    }
    else {
      this.pages = [

        { title: 'Front', component: FrontPage },
        { title: 'Login', component: LoginPage },
        { title: 'Register', component: RegisterPage}

      ];
    }
  }
}
