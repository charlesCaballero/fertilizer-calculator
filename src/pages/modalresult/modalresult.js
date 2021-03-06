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
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the ModalresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ModalresultPage = /** @class */ (function () {
    function ModalresultPage(navParams, view, loadingCtrl) {
        this.navParams = navParams;
        this.view = view;
        this.loadingCtrl = loadingCtrl;
        this.myText = '';
    }
    ModalresultPage.prototype.ionViewWillLoad = function () {
        console.log('ionViewDidLoad ModalresultPage');
        this.datas = this.navParams.get('data');
        alert(this.datas.length);
    };
    ModalresultPage.prototype.ionViewDidLoad = function () {
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();
    };
    ModalresultPage.prototype.closeModal = function () {
        this.view.dismiss();
    };
    ModalresultPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-modalresult',
            templateUrl: 'modalresult.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            ViewController,
            LoadingController])
    ], ModalresultPage);
    return ModalresultPage;
}());
export { ModalresultPage };
//# sourceMappingURL=modalresult.js.map