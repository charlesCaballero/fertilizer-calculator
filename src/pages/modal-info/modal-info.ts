import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the ModalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-info',
  templateUrl: 'modal-info.html',
})
export class ModalInfoPage {
rowid:any='';
fertilizers= [];
fname='';
nitr='';
phos='';
potas='';
price='';
pic='';
  constructor(public navCtrl: NavController,
  	private view: ViewController,
    private sqlite: SQLite, 
  	public navParams: NavParams,) {
  }

  ionViewWillLoad(){
  	this.rowid = this.navParams.get('id');
  	this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
    }).then((db: SQLiteObject) => {
    db.executeSql('SELECT * FROM fertilizerList WHERE rowid='+this.rowid, {})
      .then(res => {
        this.fertilizers = [];
        for(var i=0; i<res.rows.length; i++) {
          this.fname=res.rows.item(i).fname;
          this.nitr=res.rows.item(i).nitr;
          this.phos=res.rows.item(i).phos;
          this.potas=res.rows.item(i).potas;
          this.price=res.rows.item(i).price;
          this.pic=res.rows.item(i).fertilizer_pic;
          // alert(this.pic);
        }
      })
      .catch(e => console.log(e));

    }).catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalInfoPage');
  }

  closeModal(){
	this.view.dismiss();
}

}
