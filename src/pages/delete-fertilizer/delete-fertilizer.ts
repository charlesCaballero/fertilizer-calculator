import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController  } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the DeleteFertilizerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delete-fertilizer',
  templateUrl: 'delete-fertilizer.html',
})
export class DeleteFertilizerPage {
fertilizers: any = [];
dateTime:any;
userName=sessionStorage.getItem("username");
// results: any = [];
selectedFertilizers: any = [];
selectedF: any = [];
count=0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController,
    private modal: ModalController,
  	private sqlite: SQLite,
    private alertCtrl: AlertController
    ) {  }

  selected(i){
    this.count=0;
    this.selectedFertilizers.push(i);
    for(var x = this.selectedFertilizers.length - 1; x >= 0; x--) {
      if(this.selectedFertilizers[x] === i) {
         this.count++;
         if(this.count>1){
           this.selectedFertilizers.splice(x, 1);
           this.selectedFertilizers.pop();
         }

      }
    }
    console.log(this.selectedFertilizers);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeleteFertilizerPage');

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

  deleteFertilizer(){

  	let alert = this.alertCtrl.create({
	    title: 'Confirm Delete',
	    message: 'Do you really want to delete these fertilizers in database?',
	    buttons: [
	      {
	        text: 'Cancel',
	        role: 'cancel',
	        handler: () => {
            this.selectedFertilizers=[];
	          this.ionViewDidLoad();
	        }
	      },
	      {
	        text: 'Delete',
	        handler: () => {
	          	this.sqlite.create({
    			    name: 'fertilizer.db',
    			    location: 'default'
    			    }).then((db: SQLiteObject) => {

              this.dateTime= new Date();
                  console.log(this.dateTime);
                  
              db.executeSql('SELECT * FROM fertilizerList WHERE rowid IN ('+this.selectedFertilizers+')', {})
              .then(res =>{ 
                this.selectedF = [];
                for(var i=0; i<res.rows.length; i++) {
                  this.selectedF.push(res.rows.item(i).fname);
                }
              })
              .catch(e => console.log(e.message));
              
    			    db.executeSql('DELETE FROM `fertilizerList` WHERE rowid IN ('+this.selectedFertilizers+')', {})
    			      .then(res => {
                  
                  console.log('to be deleted:'+this.selectedF);
                  db.executeSql('INSERT INTO `activitylogs`( `uname`, `activity`, `date`) VALUES ("'+this.userName+'","DELETED the following Fertilizers: '+this.selectedF+'","'+this.dateTime.toUTCString()+'")', {})
                  .then(res =>{ 
                      console.log('Inserted Succesfully in activitylogs delete!');
                  })
                  .catch(e => console.log(e.message));

                  let alert = this.alertCtrl.create({
                    title: 'Success',
                    subTitle: 'Selected Fertilizers are already gone in the database.',
                    buttons: ['Dismiss']
                  });
                  alert.present();
                  this.selectedFertilizers=[];
    			      	this.ionViewDidLoad();
    			      })
    			      .catch(e => console.log(e));

    			    }).catch(e => console.log(e));
	        }
	      }
	    ]
	});
	alert.present();
  	
  }

  openInfo(rowid){
  const thisModal= this.modal.create('ModalInfoPage',{id:rowid});
  thisModal.present();
}

  closeModal(){
  this.view.dismiss();
}

}
