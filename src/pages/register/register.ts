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
  private user: any ={};

  constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private loginService: Login) {

          }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register = (value: any) => {
    console.log(value);
    this.user = value;
    this.loginService.setUser(this.user);
    this.loginService.register().subscribe(
      resp => {
        console.log(resp);
        this.user.user_id = resp.user_id;
        this.loginService.setUser(this.user);
        //login after Register
        this.loginService.login().subscribe(
          resp => {
            console.log(resp);
            this.user = resp.user;
            this.user.token = resp.token;
            this.loginService.setUser(this.user);
            localStorage.setItem("user", JSON.stringify(this.user));
            this.loginService.logged = true;
            this.navCtrl.setRoot(FrontPage);
          }
        )
      },
      error => {
        console.log(error);
      }
    );
  }

}
