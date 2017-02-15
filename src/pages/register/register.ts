import { FrontPage } from './../front/front';
import { Login } from './../../providers/login';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registerCredentials = {username: '', password: '', email: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: Login) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register = (value: any) => {
    //console.log(value);
    this.loginService.setUser(value);
    this.loginService.register();
    this.navCtrl.setRoot(FrontPage);
  }

}
