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

  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               private mediaService: Media,
               private loginService: Login) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getOwnPosts();
  }

  getOwnPosts = () => {
    this.mediaService.getTagFilter().subscribe(
      res => {
        console.log(res);
        this.checklist = res;

      }
    );
  }
}
