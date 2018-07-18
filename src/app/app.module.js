var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Toast } from '@ionic-native/toast';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SecondPage } from '../pages/second/second';
import { ThirdPage } from '../pages/third/third';
import { FourthPage } from '../pages/fourth/fourth';
// import { ModalresultPage } from '../pages/modalresult/modalresult';
import { CalculateProvider } from '../providers/calculate/calculate';
// import { Http } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                SecondPage,
                // ModalresultPage,
                ThirdPage,
                FourthPage
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp),
                IonicStorageModule.forRoot()
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                SecondPage,
                // ModalresultPage,
                ThirdPage,
                FourthPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                SQLite,
                Toast,
                CalculateProvider
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map