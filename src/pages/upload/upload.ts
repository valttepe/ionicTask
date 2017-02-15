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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaService: Media
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  upload = (event: any, value: any) => {
    const fileElement = event.target.querySelector('input[type=file]');
    const file = fileElement.files[0];

    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', value.title);
    fd.append('description', value.description);

    this.mediaService.postMedia(fd)
      .subscribe(
      data => {
        console.log(data);
      }
      );
  }

}
