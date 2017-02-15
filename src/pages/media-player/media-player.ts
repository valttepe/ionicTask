import { Media } from './../../providers/media';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the MediaPlayer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-media-player',
  templateUrl: 'media-player.html'
})
export class MediaPlayerPage {
  private file: any = [];
  private user: any = [];
  private firstParam: any;

  private favorite: any;
  private likes = false;

  private url = "http://media.mw.metropolia.fi/wbma/uploads/";

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaService: Media) {
    this.firstParam = this.navParams.get('firstPassed');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediaPlayerPage');
  
    console.log(this.firstParam);
    this.getFile(this.firstParam);
    
    this.getFavorites(this.firstParam);
    
    

}

  getFile = (filen: any) => {
    this.mediaService.getMediaFile(filen).subscribe(
      res => {
        console.log(res);
        this.file = res;
        this.getUsername(this.file.user_id);
      }
    );
  }

  getUsername = (user: any) => {
    this.mediaService.getUserInfo(user).subscribe(
      respon => {
        console.log(respon);
        this.user = respon;
      }
    );
  }
  getFavorites = (firstParam: any) => {
    this.mediaService.getFavorites(firstParam).subscribe(
      resp => {
        this.favorite = resp.json();
        console.log(this.favorite);
        this.checkIfLiked();

      }
    );
  }

  checkIfLiked(){
    let user = JSON.parse(window.localStorage.getItem("user"));
    console.log(user);
    for (let like of this.favorite) {
      if (user.user_id == like.user_id) {
        this.likes = true;
      }

    }
  }

  likeMedia() {
    this.mediaService.likeMedia(this.firstParam).subscribe(
      resp => {
      console.log(resp.json());
      console.log("liked!");
    });
  }

  dislikeMedia() {
    this.mediaService.dislikeMedia(this.firstParam).subscribe(
      resp => {
      console.log(resp.json());
      
    });
  }


}
