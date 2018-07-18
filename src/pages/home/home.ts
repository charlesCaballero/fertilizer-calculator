import { Component } from '@angular/core';
import { NavController, PopoverController, MenuController } from 'ionic-angular';
import {AnotherPage} from '../another/another';
import {PopoverOptionsPage} from '../popover-options/popover-options';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
// import { LoadingController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    // private loadingCtrl: LoadingController,
    private sqlite: SQLite) {

  }

presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverOptionsPage);
    popover.present({
      ev: myEvent
    });
  } 

  pushSecond(){
  	
  	this.navCtrl.push(AnotherPage);
  }
  ionViewDidLoad(){
          this.menuCtrl.swipeEnable( true );
    // const loader = this.loadingCtrl.create({
    //   content: "Please wait...",
    //   duration: 3000
    // });
    // loader.present();
  }
  ionViewWillLoad() {
    console.log('ionViewWillLoad HomePage');
    this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
    }).then((db: SQLiteObject) => {
    db.executeSql('CREATE TABLE IF NOT EXISTS fertilizerList(rowid INTEGER PRIMARY KEY, fname TEXT, nitr INT, phos INT, potas INT, price DOUBLE, fertilizer_pic TEXT)', {})
    .then(res =>{ 
      db.executeSql('SELECT * FROM `fertilizerList`', {})
    .then(res =>{ 
      console.log(res.rows.length);

       if (res.rows.length<=0) { 
        db.executeSql("INSERT INTO `fertilizerList` (`fname`, `nitr`, `phos`, `potas`, `price`, `fertilizer_pic`) VALUES"+
        " ('Sunrise Prilled Urea', '46', '0', '0', '312', './assets/imgs/fertilizer_img.jpg'),"+
        " ('Swire Ammonium Phosphate Fert.', '16', '20', '0', '243', './assets/imgs/fertilizer_img.jpg'),"+
        " ('Swire Muriate of Potash', '0', '0', '60', '323', './assets/imgs/fertilizer_img.jpg'),"+
        " ('Swire 15-15-15', '15', '15', '15', '203', './assets/imgs/fertilizer_img.jpg'),"+
        " ('Swire Urea Granular Fert.', '46', '0', '0', '234', './assets/imgs/fertilizer_img.jpg'),"+
        " ('Vaksi K Liquid Fert.', '0', '30', '20', '245', './assets/imgs/fertilizer_img.jpg'),"+
        " ('Ace NPK 19-19-19 Fert.', '19', '19', '19', '321', './assets/imgs/fertilizer_img.jpg'),"+
        " ('Pegador pH Inorganic Fert.', '0', '27', '0', '261', './assets/imgs/fertilizer_img.jpg'),"+
        " ('Test Fert.', '30', '0', '30', '261', './assets/imgs/fertilizer_img.jpg'),"+
        " ('Prinz Fortified Liquid Fert.', '0', '20', '0', '203', './assets/imgs/fertilizer_img.jpg'),"+
        " ('Ace NPK 15-15-30 Fert.', '15', '15', '30', '314', './assets/imgs/fertilizer_img.jpg');"  , {})
        .then(res => {console.log('Data Inserted to Table!');})
        .catch(e => console.log(e.message));
      }
      else{ console.log('Not doing anything.')}
      
    })
    .catch(e => console.log(e));
      
      
    })
    .catch(e => console.log(e));
    
    }).catch(e => console.log(e.message));
  }
}
