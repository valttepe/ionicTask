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
  private fileId: any = [];
  private checkThumb: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaService: Media) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
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
        this.checkThumbnails();
        this.navCtrl.setRoot(FrontPage);
      }
      );
  }

  checkThumbnails = () => {
    this.mediaService.getMediaFile(this.fileId.file_id).subscribe(
      res => {
        console.log(res);
        this.checkThumb = res;
        if(this.checkThumb.thumbnails != null) {
          this.navCtrl.setRoot(FrontPage);
        }
        else {
          this.checkThumb();
        }
        
      }
    );
  }

  filterTag = () => {

  }

}
