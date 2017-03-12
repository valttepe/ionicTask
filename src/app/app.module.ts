import { TabsPage } from './../pages/tabs/tabs';
import { ToplikedPage } from './../pages/topliked/topliked';
import { TopratedPage } from './../pages/toprated/toprated';
import { SearchPage } from './../pages/search/search';
import { ProfilePage } from './../pages/profile/profile';
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
    RegisterPage,
    ProfilePage,
    SearchPage,
    TopratedPage,
    ToplikedPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      // Configs for your app
      tabsHideOnSubPages: true
      // ...
    },)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    FrontPage,
    MediaPlayerPage,
    UploadPage,
    RegisterPage,
    ProfilePage,
    SearchPage,
    ToplikedPage,
    TopratedPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Login, Media]
})
export class AppModule {}
