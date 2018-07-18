import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalAlertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-alert',
  templateUrl: 'modal-alert.html',
})
export class ModalAlertPage {

  constructor(public navCtrl: NavController, 
  	private view: ViewController,
  	public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalAlertPage');
  }
closeModal(){
	this.view.dismiss();
}
}
