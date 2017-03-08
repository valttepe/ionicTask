import { Login } from './../../providers/login';
import { FrontPage } from './../front/front';
import { ProfilePage } from './../profile/profile';
import { LoginPage } from './../login/login';
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
  private commentCredentials = { file_id: '', comment: '' };
  private comments: any = [];
  private favorite: any;
  private likes = false;
  private rate: any = 1;
  private userRating: any = { file_id: '', rating: '' };

  private url = "http://media.mw.metropolia.fi/wbma/uploads/";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private mediaService: Media,
    private loginService: Login
  ) {
    this.firstParam = this.navParams.get('firstPassed');
  }

 ionViewCanEnter(){
   this.checkIflog();
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediaPlayerPage');
    this.checkIflog();
    console.log(this.firstParam);
    this.getFile(this.firstParam);

    this.getFavorites(this.firstParam);
    this.getComments();



  }

  getFile = (filen: any) => {
    this.mediaService.getMediaFile(filen).subscribe(
      res => {
        console.log(res);
        this.file = res;
        this.userRating.file_id = this.firstParam;
        this.userRating.rating = this.rate;
        console.log(this.userRating);
        this.postRating(this.userRating);
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

  checkIfLiked() {
    let user = JSON.parse(window.localStorage.getItem("user"));
    console.log(user);
    console.log(this.favorite);
    this.likes = false;
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
        this.getFavorites(this.firstParam);
        console.log(resp.json());
        console.log("liked!");
      }
    );

  }

  dislikeMedia() {
    this.mediaService.dislikeMedia(this.firstParam).subscribe(
      resp => {

        console.log(resp.json());
        this.getFavorites(this.firstParam);
        console.log(resp.json());

      }
    );

  }

  postComment = (value: any) => {
    console.log(this.firstParam);
    console.log(value.comment);
    this.commentCredentials.file_id = this.firstParam;
    console.log(this.commentCredentials);
    this.mediaService.postComment(this.commentCredentials).subscribe(
      resp => {
        console.log(resp);
        this.getComments();
      }
    );
  }

  getComments = () => {
    this.mediaService.getComments(this.firstParam).subscribe(
      resp => {
        //console.log("Here is commentlist");
        //console.log(resp);
        this.comments = resp;

        //console.log(this.commentUser);
        if (this.comments != null) {
          this.getCommentUsers();
          console.log("userlist");
          console.log(this.comments);
        }
      });

  }


  getCommentUsers = () => {
    for (let user of this.comments) {
      //console.log(user);
      this.mediaService.getUserInfo(user.user_id).subscribe(
        res => {
          //console.log("user");
          //console.log(res);
          for (let i in this.comments) {
            if (this.comments[i].user_id == res.user_id) {
              this.comments[i].username = res.username;
            }
          }
        });
    }
  }

 changeValue = (event) =>{
    this.rate = event.value;
  }

  postRating = (id: any) =>{
    this.mediaService.postRating(id).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  onSubmit(): void {
    this.commentCredentials.comment = '';
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

  checkIflog = () => {
    if (localStorage.getItem("user") != null) {
      console.log("you are logged in");
      this.loginService.logged = true;

      let sethidden = document.querySelector(".loginbutton");
      sethidden.setAttribute("id", "dontshow");
      console.log(sethidden);

      let setshow = document.querySelector(".logoutbutton");
      setshow.setAttribute("id", "show");
      console.log(setshow);

      let setprof = document.querySelector(".profilebutton");
      setprof.setAttribute("id", "show");
      console.log(setprof);
    }
    else {
      console.log("you are not logged in");

    }
  }

}

