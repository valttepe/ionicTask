import { ThumbnailPipe } from './../../app/pipes/thumbnail.pipe';
import { Media } from './../../providers/media';
import { Component, Pipe } from '@angular/core';
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

  private images: any =[];
  private url = "http://media.mw.metropolia.fi/wbma/uploads/";
  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaService: Media) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrontPage');
    this.mediaService.getMedia().subscribe(
      res => {
        console.log(res);
        this.images = res;
      }
    );
  }

}
