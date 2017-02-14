import { ThumbnailPipe } from './pipes/thumbnail.pipe';
import { FrontPage } from './../pages/front/front';
import { Media } from './../providers/media';
import { LoginPage } from './../pages/login/login';
import { Login } from './../providers/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';



@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    FrontPage,
    ThumbnailPipe

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    FrontPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Login, Media]
})
export class AppModule {}
