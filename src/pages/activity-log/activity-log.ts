import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the ActivityLogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activity-log',
  templateUrl: 'activity-log.html',
})
export class ActivityLogPage {

activitylogs:any = [];

  constructor(
  	public navCtrl: NavController, 
    private sqlite: SQLite,
  	public navParams: NavParams
  	) {
  }

  ionViewWillLoad() {
    console.log('ionViewWillLoad ActivityLogPage');
    this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
    }).then((db: SQLiteObject) => {
    db.executeSql('SELECT * FROM activitylogs', {})
	    .then(res =>{ 
	    	console.log( res.rows.length);

	    	for (var i = res.rows.length - 1; i >= 0; i--) {
		      this.activitylogs.push({uname:res.rows.item(i).uname, activity:res.rows.item(i).activity, date: res.rows.item(i).date})
	    	}
	    })
	    .catch(e => console.log(e.message));    
    
    }).catch(e => console.log(e.message));
  }

}
