import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, App } from 'ionic-angular';
import {ThirdPage} from '../third/third';
import { LoadingController} from 'ionic-angular';

/**
 * Generated class for the ModalresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modalresult',
  templateUrl: 'modalresult.html',
})
export class ModalresultPage {

datas : any;
myText='';

  constructor( 
    private navParams: NavParams, 
    // public navCtrl: NavController, 
    public appCtrl: App, 
  	private view: ViewController,
   	private loadingCtrl: LoadingController
    ) {  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad ModalresultPage');

    this.datas = this.navParams.get('data');
    // alert(this.datas.length);


  }
  ionViewDidLoad(){
  	const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

closeModal(){
	this.view.dismiss();
  this.appCtrl.getRootNav().push(ThirdPage);
}

}
