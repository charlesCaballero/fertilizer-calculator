import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the EditFertilizerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-fertilizer',
  templateUrl: 'edit-fertilizer.html',
})
export class EditFertilizerPage {

private fertilizers : any;

  constructor(public navCtrl: NavController, 
    private modal: ModalController,
    private view: ViewController,
  	public navParams: NavParams, 
  	private sqlite: SQLite) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditFertilizerPage');
    this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
    }).then((db: SQLiteObject) => {
    db.executeSql('SELECT * FROM fertilizerList ORDER BY rowid ASC', {})
      .then(res => {
        this.fertilizers = [];
        for(var i=0; i<res.rows.length; i++) {
          this.fertilizers.push({rowid:res.rows.item(i).rowid,fname:res.rows.item(i).fname,nitr:res.rows.item(i).nitr,phos:res.rows.item(i).phos,potas:res.rows.item(i).potas,price:res.rows.item(i).price});
        }
      })
      .catch(e => console.log(e));

    }).catch(e => console.log(e));
  }

  editModal(rowid){

    const thisModal= this.modal.create('ModalEditPage',{data:rowid});
    thisModal.present();
  
  }

    closeModal(){
  this.view.dismiss();
}

}
