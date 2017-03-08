import { ProfilePage } from './../profile/profile';
import { Login } from './../../providers/login';
import { FrontPage } from './../front/front';
import { Media } from './../../providers/media';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Upload page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {

  uploadCredentials = { file: '', title: '', description: '' };
  private tags: any = [];
  private fileId: any = [];
  private rating: number;
  private rate: any = 1;
  private filter = { file_id: '', tag: '#HereForBeer' };
  private userRating = { file_id: '', rating: '' };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private mediaService: Media,
    private loginService: Login
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
    this.checkIflog();
  }

  upload = (event: any, value: any) => {
    const fileELement = event.target.querySelector('input[type=file]');
    const file = fileELement.files[0];

    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', value.title);
    fd.append('description', value.description);

    this.mediaService.postMedia(fd)
      .subscribe(
      data => {
        console.log(data);
        this.fileId = data;
        console.log(this.fileId);
        this.userRating.file_id = this.fileId.file_id;
        this.userRating.rating = this.rate;
        console.log(this.userRating);
        this.postRating(this.userRating);
        this.filterTag();
        //this.navCtrl.setRoot(FrontPage);
      }
      );
  }

  filterTag = () => {
    this.filter.file_id = this.fileId.file_id;
    console.log(this.filter);
    this.mediaService.postTagFilter(this.filter).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  checkIflog = () => {
    if (localStorage.getItem("user") != null) {
      console.log("you are logged in");
      this.loginService.logged = true;
    }
    else {
      console.log("you are not logged in");

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

  getToProfile() {
    this.navCtrl.setRoot(ProfilePage);
  }

  logout() {
    this.loginService.logout();
    this.navCtrl.setRoot(FrontPage);
  }

}
