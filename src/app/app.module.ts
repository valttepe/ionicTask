import { UploadPage } from './../pages/upload/upload';
import { RegisterPage } from './../pages/register/register';
import { MediaPlayerPage } from './../pages/media-player/media-player';
import { ThumbnailPipe } from './pipes/thumbnail.pipe';
import { FrontPage } from './../pages/front/front';
import { Media } from './../providers/media';
import { LoginPage } from './../pages/login/login';
import { Login } from './../providers/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    FrontPage,
    ThumbnailPipe,
    MediaPlayerPage,
    UploadPage,
    RegisterPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    FrontPage,
    MediaPlayerPage,
    UploadPage,
    RegisterPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Login, Media]
})
export class AppModule {}
