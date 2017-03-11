import { FrontPage } from './../front/front';
import { Login } from './../../providers/login';
import { Media } from './../../providers/media';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  private checklist = [];
  private ownPosts = [];
  private username = String;

  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               private mediaService: Media,
               private loginService: Login
               ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getOwnUser();
    this.getOwnPosts();
  }

  getOwnUser = () => {
      this.username = JSON.parse(localStorage.getItem("user")).username;
  }

  getOwnPosts = () => {
    this.mediaService.getTagFilter().subscribe(
      res => {
        console.log(res);
        this.checklist = res;

      }
    );
  }
  logout() {
    this.loginService.logout();
    this.navCtrl.setRoot(FrontPage);
    location.reload();
    //this.menuPages.emit(false);
  }
}
