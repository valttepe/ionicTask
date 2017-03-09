import { MediaPlayerPage } from './../media-player/media-player';
import { Media } from './../../providers/media';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private images: any = [];
  searchQuery: string = '';
  items: any =[];

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  private mediaService: Media
  ) {
    this.getFilteredFiles();
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    //this.getFilteredFiles();
  }

  initializeItems() {
    if(this.images){
      this.items = this.images.filter(function(some){
      return some.title.length > 0;
    }) 
    }
    
  }

  getFilteredFiles = () => {
    this.mediaService.getTagFilter().subscribe(
      res => {
        this.images = [];
        this.images = res;
        console.log(this.images);
      }
    );
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.getFilteredFiles();
    
    this.initializeItems();
    

    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        console.log(item);
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
      this.items = [];
    }
  }

  openFile = (fileid: any) => {
    if (localStorage.getItem("user") != null) {
      this.navCtrl.push(MediaPlayerPage, {
        firstPassed: fileid,
      });

    }

  }
}
