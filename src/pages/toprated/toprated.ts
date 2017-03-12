import { Login } from './../../providers/login';
import { Media } from './../../providers/media';
import { MediaPlayerPage } from './../media-player/media-player';
import { LoginPage } from './../login/login';
import { ProfilePage } from './../profile/profile';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Toprated page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-toprated',
  templateUrl: 'toprated.html'
})
export class TopratedPage {
 private images: any = [];
  private url = "http://media.mw.metropolia.fi/wbma/uploads/";
  private likecount: any = [];
  private commentcount: any = [];
  private test: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private mediaService: Media,
    private loginService: Login) {}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToplikedPage');
    this.checkIflog();
    this.getMedia();
    //this.navCtrl.setRoot(ToplikedPage);
  }
  ionViewWillEnter(){
    this.compareLikecount();
    
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
    console.log(this.images);
    
  }
 compareLikecount = () => {
    this.images.sort(function(a, b) {
          console.log(a.likecount);
          return parseFloat(a.commentcount) - parseFloat(b.commentcount);
        });
    this.images.reverse();
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
    let i = this.images.length - 1;
    for (let image of this.images) {
      //console.log(user);
      this.mediaService.getComments(image.file_id).subscribe(
        res => {
          //console.log("user");
          this.commentcount = res;
          //console.log("comments");
          //console.log(this.commentcount);
          
          image.commentcount = this.commentcount.length;
          this.test[i] = image;
          if(i == 0){
            this.compareLikecount();
          }
          i--;
        });
    }

  }

  getToLogin() {
    this.navCtrl.push(LoginPage);
  }
  getToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  logout() {
    this.loginService.logout();
    this.navCtrl.setRoot(TabsPage);
    location.reload();
    //this.menuPages.emit(false);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.getMedia(refresher);
  }
}
