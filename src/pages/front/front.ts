import { ProfilePage } from './../profile/profile';
import { Login } from './../../providers/login';
import { LoginPage } from './../login/login';
import { MediaPlayerPage } from './../media-player/media-player';
import { ThumbnailPipe } from './../../app/pipes/thumbnail.pipe';
import { Media } from './../../providers/media';
import { Component, Pipe, ViewChild } from '@angular/core';
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

  private images: any = [];
  private fill: any = [];
  private url = "http://media.mw.metropolia.fi/wbma/uploads/";
  private num: number = 0;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mediaService: Media,
              private loginService: Login
              ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrontPage');
    this.checkIflog();
    this.getMedia();
    
  }

  getMedia = (refresher = null) => {
    this.mediaService.getMedia().subscribe(
      res => {

        //this.fill = res;
        this.getFilteredFiles();
        //this.images = res;
        if(refresher != null){
            refresher.complete();
          }
      }
    );
  }

  getFilteredFiles = () =>{
    this.mediaService.getTagFilter().subscribe(
      res => {
        //console.log(res);
        this.fill = res;
        this.images =[];
        //console.log(this.fill.length);
        this.num = this.fill.length -1;
        //console.log(this.num);
        for(let file in this.fill){
          //console.log(this.fill[this.num]);
          //console.log(this.num);
          this.images.push(this.fill[this.num]);
          this.num = this.num - 1;
        }
        //console.log(this.images);
        if (this.images != null && this.loginService.logged == true) {
          this.getPostUsers();
          //console.log("userlist");
          //console.log(this.images[0]);

        }



      }
    );
  }


checkIflog = () => {
  if(localStorage.getItem("user") != null) {
    console.log("you are logged in");
    this.loginService.logged = true;

    let sethidden = document.querySelector(".loginbutton");
    sethidden.setAttribute("id","dontshow");

    let setshow = document.querySelector(".logoutbutton");
    setshow.setAttribute("id", "show");

    let setprof = document.querySelector(".profilebutton");
    setprof.setAttribute("id","show");
  }
  else{
    console.log("you are not logged in");
  }
}

  openFile = (fileid: any) => {
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

  getToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
  getToProfile() {
    this.navCtrl.setRoot(ProfilePage);
  }

  logout() {
    this.loginService.logout();
    this.navCtrl.setRoot(FrontPage);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.getMedia(refresher);
  }



}
