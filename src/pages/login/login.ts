import { FrontPage } from './../front/front';
import { Http } from '@angular/http';
import { Login } from './../../providers/login';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  registerCredentials = { username: '', password: '' };

  private user: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginService: Login,
    private http: Http
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if (localStorage.getItem("user") !== null) {
      this.loginService.setUser(JSON.parse(localStorage.getItem("user")));
      this.loginService.getUserInfo()
        .subscribe(
        resp => {
          this.loginService.logged = true;
          this.navCtrl.setRoot(FrontPage);
        },
        error => {
          console.log(error);
          this.loginService.logout();
        }
        )
    }
  }

  login = (value: any) => {
    console.log(this.registerCredentials);
    console.log(value);
    this.loginService.setUser(value);
    this.loginService.login().subscribe(
      resp => {
        this.user = resp.user;
        console.log(this.user);
        this.user.token = resp.token;
        this.loginService.setUser(this.user);
        localStorage.setItem("user", JSON.stringify(this.user));
        this.loginService.logged = true;
        this.navCtrl.setRoot(FrontPage);
      },
      error => {
        console.log(error);
      }
    )


  }
}
