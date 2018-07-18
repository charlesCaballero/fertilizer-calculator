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
import { NavController } from 'ionic-angular';
import { SecondPage } from '../second/second';
import { SQLite } from '@ionic-native/sqlite';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, sqlite) {
        this.navCtrl = navCtrl;
        this.sqlite = sqlite;
    }
    HomePage.prototype.pushSecond = function () {
        this.navCtrl.push(SecondPage);
    };
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HomePage');
        this.sqlite.create({
            name: 'fertilizer.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('CREATE TABLE IF NOT EXISTS fertilizerList(rowid INTEGER PRIMARY KEY, fname TEXT, nitr INT, phos INT, potas INT, price DOUBLE)', {})
                .then(function (res) {
                console.log('Table Created!');
                alert('Table Created!');
                db.executeSql("INSERT INTO `fertilizerList` (`fname`, `nitr`, `phos`, `potas`, `price`) VALUES" +
                    " ('Sunrise Prilled Urea', '46', '0', '0', '312')," +
                    " ('Swire Ammonium Phosphate Fert.', '16', '20', '0', '243')," +
                    " ('Swire Muriate of Potash', '0', '0', '60', '323')," +
                    " ('Swire 15-15-15', '15', '15', '15', '203')," +
                    " ('Swire Urea Granular Fert.', '46', '0', '0', '234')," +
                    " ('Vaksi K Liquid Fert.', '0', '30', '20', '245')," +
                    " ('Ace NPK 19-19-19 Fert.', '19', '19', '19', '321')," +
                    " ('Pegador pH Inorganic Fert.', '0', '27', '0', '261')," +
                    " ('Test Fert.', '30', '0', '30', '261')," +
                    " ('Prinz Fortified Liquid Fert.', '0', '20', '0', '203')," +
                    " ('Ace NPK 15-15-30 Fert.', '15', '15', '30', '314');", {})
                    .then(function (res) { console.log('Data Inserted to Table!'); alert('Data Inserted to Table!'); })
                    .catch(function (e) { return console.log(e); });
            })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            SQLite])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map