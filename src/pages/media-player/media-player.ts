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
  private fileid: any;
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

 


}
}
