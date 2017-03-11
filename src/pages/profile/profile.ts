import { MediaPlayerPage } from './../media-player/media-player';
import { FrontPage } from './../front/front';
import { Login } from './../../providers/login';
import { Media } from './../../providers/media';
import { ThumbnailPipe } from './../../app/pipes/thumbnail.pipe';
import { Component, Pipe } from '@angular/core';
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

  private checklist:any = [];
  private ownPosts:any = [];
  private username: String;
  private url = "http://media.mw.metropolia.fi/wbma/uploads/";

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
        console.log(JSON.parse(localStorage.getItem("user")).user_id);
        this.checklist = res;
        console.log(this.checklist[0].user_id);
        this.checkIfYours();
      }
    );
  }


  checkIfYours = () =>{
    for(let post of this.checklist){
        console.log(post);
        if(post.user_id == JSON.parse(localStorage.getItem("user")).user_id){
          this.ownPosts.push(post);
        }
    }
    this.ownPosts.reverse();
    console.log(this.ownPosts);

  }
  openFile = (fileid: any) => {
    if (localStorage.getItem("user") != null) {
      this.navCtrl.push(MediaPlayerPage, {
        firstPassed: fileid,
      });

    }
  }
  logout() {
    this.loginService.logout();
    this.navCtrl.setRoot(FrontPage);
    location.reload();
    //this.menuPages.emit(false);
  }
}
