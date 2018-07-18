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
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { CalculateProvider } from '../../providers/calculate/calculate';
var ThirdPage = /** @class */ (function () {
    function ThirdPage(navCtrl, navParams, calculate, modal, sqlite) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.calculate = calculate;
        this.modal = modal;
        this.sqlite = sqlite;
        this.Nitr = parseInt(sessionStorage.getItem("RecN"));
        this.Phos = parseInt(sessionStorage.getItem("RecP"));
        this.Potas = parseInt(sessionStorage.getItem("RecK"));
        this.fertilizers = [];
        this.results = [];
        this.selectedFertilizers = [];
        this.count = 0;
    }
    ThirdPage.prototype.selected = function (i) {
        this.count = 0;
        this.selectedFertilizers.push(i + 1);
        for (var x = this.selectedFertilizers.length - 1; x >= 0; x--) {
            if (this.selectedFertilizers[x] === i + 1) {
                this.count++;
                if (this.count > 1) {
                    this.selectedFertilizers.splice(x, 1);
                    this.selectedFertilizers.pop();
                }
            }
        }
        console.log(this.selectedFertilizers);
    };
    ThirdPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ThirdPage');
        this.sqlite.create({
            name: 'fertilizer.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM fertilizerList ORDER BY rowid ASC', {})
                .then(function (res) {
                _this.fertilizers = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.fertilizers.push({ rowid: res.rows.item(i).rowid, fname: res.rows.item(i).fname, nitr: res.rows.item(i).nitr, phos: res.rows.item(i).phos, potas: res.rows.item(i).potas, price: res.rows.item(i).price });
                }
            })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    ThirdPage.prototype.displayModal = function () {
        var _this = this;
        this.calculate.additionalCondition = 'rowid IN (' + this.selectedFertilizers + ') AND';
        this.calculate.beginCaculation(this.Nitr, this.Phos, this.Potas);
        this.calculate.passResults().then(function (result) {
            _this.results = result;
            // alert(this.results.length);
            if (_this.results.length <= 0) {
                var thisModal = _this.modal.create('ModalAlertPage');
                thisModal.present();
            }
            else {
                var thisModal = _this.modal.create('ModalresultPage', { data: _this.results });
                thisModal.present();
            }
        });
    };
    ThirdPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-third',
            templateUrl: 'third.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            CalculateProvider,
            ModalController,
            SQLite])
    ], ThirdPage);
    return ThirdPage;
}());
export { ThirdPage };
//# sourceMappingURL=third.js.map