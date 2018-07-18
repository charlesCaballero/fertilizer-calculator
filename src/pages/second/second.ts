import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {ThirdPage} from '../third/third';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {PopoverOptionsPage} from '../popover-options/popover-options';

@IonicPage()
@Component({
  selector: 'page-second',
  templateUrl: 'second.html',
})
export class SecondPage {

  RecommendedK='10';
  RecommendedP='10';
  RecommendedN='10';
  storedN='';
  

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    // private sqlite: SQLite,
    public navParams: NavParams
    ) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverOptionsPage);
    popover.present({
      ev: myEvent
    });
  }
  
  pushThird(){
    sessionStorage.setItem('RecK',this.RecommendedK);
    sessionStorage.setItem('RecP',this.RecommendedP);
    sessionStorage.setItem('RecN',this.RecommendedN);
    

    console.log(sessionStorage.getItem('RecK')+','+sessionStorage.getItem('RecP')+','+sessionStorage.getItem('RecN'));
  	
  	this.navCtrl.push(ThirdPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecondPage');
  }

}
