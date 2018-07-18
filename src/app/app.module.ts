// PLUGINS
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

// PAGES
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AnotherPage } from '../pages/another/another';
import { LoginPage } from '../pages/login/login';
import { SecondPage } from '../pages/second/second';
import { ActivityLogPage } from '../pages/activity-log/activity-log';
import { PopoverOptionsPage } from '../pages/popover-options/popover-options';
import { ThirdPage } from '../pages/third/third';
import { AddFertilizerPage } from '../pages/add-fertilizer/add-fertilizer';
import { EditFertilizerPage } from '../pages/edit-fertilizer/edit-fertilizer';
import { DeleteFertilizerPage } from '../pages/delete-fertilizer/delete-fertilizer';
// MODULES
// import { HomePageModule } from '../pages/home/home.module';
import { IonicStorageModule } from '@ionic/storage';
import { LoginPageModule } from '../pages/login/login.module';
import { AnotherPageModule } from '../pages/another/another.module';
import { SecondPageModule } from '../pages/second/second.module';
import { ActivityLogPageModule } from '../pages/activity-log/activity-log.module';
import { ThirdPageModule } from '../pages/third/third.module';
import { PopoverOptionsPageModule } from '../pages/popover-options/popover-options.module';
import { AddFertilizerPageModule } from '../pages/add-fertilizer/add-fertilizer.module';
import { EditFertilizerPageModule } from '../pages/edit-fertilizer/edit-fertilizer.module';
import { DeleteFertilizerPageModule } from '../pages/delete-fertilizer/delete-fertilizer.module';


@NgModule({
  declarations: [
    MyApp,
    // LoginPage,
    HomePage,
    // PopoverOptionsPage,
    // ThirdPage,
    // AddFertilizerPage,
    // EditFertilizerPage,
    // DeleteFertilizerPage,
    // FourthPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AddFertilizerPageModule,
    EditFertilizerPageModule,
    DeleteFertilizerPageModule,
    AnotherPageModule,
    SecondPageModule,
    ActivityLogPageModule,
    ThirdPageModule,
    LoginPageModule,
    // HomePageModule,
    PopoverOptionsPageModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    AnotherPage,
    ActivityLogPage,
    SecondPage,
    PopoverOptionsPage,
    ThirdPage,
    AddFertilizerPage,
    EditFertilizerPage,
    DeleteFertilizerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileTransfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite
  ]
})
export class AppModule {}
