import { RegisterPage } from './../register/register';
import { FrontPage } from './../front/front';
import { Http } from '@angular/http';
import { Login } from './../../providers/login';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Component, Output, EventEmitter } from '@angular/core';

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

  @Output() menuPages = new EventEmitter();
  registerCredentials = { username: '', password: '' };

  private user: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginService: Login,
    private http: Http,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
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
        this.presentToast();
        location.reload();
        //this.menuPages.emit(true);
      },
      error => {
        this.presentAlert();
        console.log(error);
      }
    )


  }
   getToRegister() {
    this.navCtrl.setRoot(RegisterPage);
  }
  presentAlert(){
    let alert = this.alertCtrl.create({
      title: 'Username or password incorrect!',
      subTitle: 'Please try again!',
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'You have logged in',
    duration: 3000,
    position: 'middle'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

}
