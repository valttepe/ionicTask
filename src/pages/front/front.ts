import { ProfilePage } from './../profile/profile';
import { Login } from './../../providers/login';
import { LoginPage } from './../login/login';
import { MediaPlayerPage } from './../media-player/media-player';
import { ThumbnailPipe } from './../../app/pipes/thumbnail.pipe';
import { Media } from './../../providers/media';
import { Component, Pipe, ViewChild, Output, EventEmitter } from '@angular/core';
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

  @Output() menuPages = new EventEmitter();
  private images: any = [];
  private url = "http://media.mw.metropolia.fi/wbma/uploads/";
  private likecount: any = [];
  private commentcount: any = [];

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
    //this.fill = res;
    this.getFilteredFiles();
    //this.images = res;
    if (refresher != null) {
      refresher.complete();
    }
  }

  getFilteredFiles = () => {
    this.mediaService.getTagFilter().subscribe(
      res => {
        this.images = [];
        this.images = res.reverse();
        //console.log(this.images);
        this.getPostLikes();
        this.getPostComments();
        if (this.images != null && this.loginService.logged == true) {
          this.getPostUsers();  
        }



      }
    );
  }


  checkIflog = () => {
    if (localStorage.getItem("user") != null) {
      console.log("you are logged in");
      this.loginService.logged = true;

    }
  }

  openFile = (fileid: any) => {
    if (localStorage.getItem("user") != null) {
      this.navCtrl.push(MediaPlayerPage, {
        firstPassed: fileid,
      });

    }

  }

  getPostUsers = () => {
    for (let image of this.images) {
      //console.log(user);
      this.mediaService.getUserInfo(image.user_id).subscribe(
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

  getPostLikes = () => {
    for (let image of this.images) {
      //console.log(user);
      this.mediaService.getFavorites(image.file_id).subscribe(
        res => {
          //console.log("user");
          this.likecount = res;
          
          image.likecount = this.likecount.length;
          
        });
    }
  }

  getPostComments = () => {
    for (let image of this.images) {
      //console.log(user);
      this.mediaService.getComments(image.file_id).subscribe(
        res => {
          //console.log("user");
          this.commentcount = res;
          //console.log("comments");
          //console.log(this.commentcount);
          
          image.commentcount = this.commentcount.length;
          
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
    location.reload();
    //this.menuPages.emit(false);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.getMedia(refresher);
  }



}
