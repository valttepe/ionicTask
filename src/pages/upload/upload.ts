import { ProfilePage } from './../profile/profile';
import { Login } from './../../providers/login';
import { FrontPage } from './../front/front';
import { Media } from './../../providers/media';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController, Loading, Platform, LoadingController } from 'ionic-angular';
import { Keyboard, Camera, File } from 'ionic-native';

/*
  Generated class for the Upload page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var cordova: any;

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {
  
  @ViewChild('focusInput') myInput;
  uploadCredentials = { file: '', title: '', description: '' };
  private tags: any = [];
  private fileId: any = [];
  private rating: number;
  private rate: any = 1;
  private filter = { file_id: '', tag: '#HereForBeer' };
  private userRating = { file_id: '', rating: '' };

  // Camera

  base64Image: string;
  /*lastImage: string = null;
  loading: Loading;*/

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private mediaService: Media,
    private loginService: Login,
    private NavController: NavController,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private toastController: ToastController
    ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
    this.checkIflog();
    setTimeout(() => {
      Keyboard.show();
      this.myInput.setFocus();
    },150);
  }

  upload = (event: any, value: any) => {
    const fileELement = event.target.querySelector('input[type=file]');
    const file = fileELement.files[0];

    const fd = new FormData();
    if (this.base64Image) {
      fd.append('file', this.dataURItoBlob(this.base64Image))
    } else {
      fd.append('file', file);
    }
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
        this.navCtrl.setRoot(FrontPage);
        this.presentToast('kulli');
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

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: 'Your beer has been shared!',
      duration: 5000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
    }
    

  /*
  Actionsheet for uploading pictures from gallery and from
  devices Camera.
  */

  public presentActionSheet() {
    console.log('actionsheet')
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'From gallery',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  /*
  Function to take picture and it can be accessed from presentActionSheet
  */
  takePicture(sourceType) {
    //Data from image
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });    
  }
  dataURItoBlob = (dataURI: any) => {
    'use strict'
    var byteString,
      mimestring

    if (dataURI.split(',')[0].indexOf('base64') !== -1) {
      byteString = atob(dataURI.split(',')[1])
    } else {
      byteString = decodeURI(dataURI.split(',')[1])
    }

    mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var content = new Array();
    for (var i = 0; i < byteString.length; i++) {
      content[i] = byteString.charCodeAt(i)
    }

    return new Blob([new Uint8Array(content)], { type: mimestring });
  }
}
