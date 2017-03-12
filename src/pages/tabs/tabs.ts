import { Media } from './../../providers/media';
import { TopratedPage } from './../toprated/toprated';
import { ToplikedPage } from './../topliked/topliked';
import { FrontPage } from './../front/front';
import { Component } from '@angular/core';


/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = FrontPage;
  tab2Root: any = ToplikedPage;
  tab3Root: any = TopratedPage;

  constructor(private mediaService: Media) {}
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
  
}
