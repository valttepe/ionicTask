import { Login } from './../../providers/login';
import { LoginPage } from './../login/login';
import { MediaPlayerPage } from './../media-player/media-player';
import { ThumbnailPipe } from './../../app/pipes/thumbnail.pipe';
import { Media } from './../../providers/media';
import { Component, Pipe } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Front page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-front',
  templateUrl: 'front.html',
})
export class FrontPage {

  private images: any =[];
  private postUser: any = [];
  private url = "http://media.mw.metropolia.fi/wbma/uploads/";
  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaService: Media, private loginService: Login) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrontPage');
    this.mediaService.getMedia().subscribe(
      res => {
        console.log(res);
        this.images = res;
        this.postUser.length = this.images.length;
        console.log(this.postUser);
        if (this.images != null && this.loginService.logged == true) {
          this.getPostUsers();
          console.log("userlist");
          console.log(this.images[0]);
        }
      }
    );
  }

  openFile = (fileid: any) =>{
    this.navCtrl.push(MediaPlayerPage, {
      firstPassed: fileid,
    });
  }

  getPostUsers = () => {
    for (let user of this.images) {
      //console.log(user);
      this.mediaService.getUserInfo(user.user_id).subscribe(
        res => {
          //console.log("user");
          //console.log(res);
          for (let i in this.images) {
            if (this.images[i].user_id == res.user_id) {
              this.images[i].username = res.username;
            }
          }
        });
    }
  }

  getToLogin = () => {
    this.navCtrl.setRoot(LoginPage);
  }



}
