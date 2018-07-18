var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FourthPage } from '../fourth/fourth';
var SecondPage = /** @class */ (function () {
    function SecondPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.RecommendedK = '';
        this.RecommendedP = '';
        this.RecommendedN = '';
        this.storedN = '';
    }
    SecondPage.prototype.pushFourth = function () {
        sessionStorage.setItem('RecK', this.RecommendedK);
        sessionStorage.setItem('RecP', this.RecommendedP);
        sessionStorage.setItem('RecN', this.RecommendedN);
        console.log(sessionStorage.getItem('RecK') + ',' + sessionStorage.getItem('RecP') + ',' + sessionStorage.getItem('RecN'));
        this.navCtrl.push(FourthPage);
    };
    SecondPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SecondPage');
    };
    SecondPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-second',
            templateUrl: 'second.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams])
    ], SecondPage);
    return SecondPage;
}());
export { SecondPage };
//# sourceMappingURL=second.js.map