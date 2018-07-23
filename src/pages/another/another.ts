import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, AlertController } from 'ionic-angular';
import {SecondPage} from '../second/second';
import {PopoverOptionsPage} from '../popover-options/popover-options';

/**
 * Generated class for the AnotherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-another',
  templateUrl: 'another.html',
})
export class AnotherPage {

  testCheckboxOpen = false;
  testCheckboxResult: any;
  client='';
  constructor(
  	public navCtrl: NavController, 
  	private alertCtrl: AlertController,
  	public popoverCtrl: PopoverController
  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnotherPage');
  }

  getVegetables(){
  	let alert = this.alertCtrl.create();
    alert.setTitle('Select Vegetables');

    alert.addInput({
        type: 'checkbox',
        label: 'Carrots',
        value: 'Carrots',
    });

    alert.addInput({
        type: 'checkbox',
        label: 'Cabbage',
        value: 'Cabbage'
    });

    alert.addInput({
        type: 'checkbox',
        label: 'Broccoli',
        value: 'Broccoli'
    });

    alert.addInput({
        type: 'checkbox',
        label: 'Potatoes',
        value: 'Potatoes'
    });

    alert.addInput({
        type: 'checkbox',
        label: 'Cauliflower',
        value: 'Cauliflower'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: (data: any) => {
          console.log('Client:', this.client);
          console.log('Checkbox data:', data);
          this.testCheckboxOpen = false;
          this.testCheckboxResult = data;

      }
    });

    alert.present();
  }

  continue(){
    if (this.testCheckboxResult==undefined || this.client=='') { 
      let myalert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Please make sure to fill-in client name and choose vegetables!',
            buttons: ['Dismiss']
          });
      myalert.present();
    } else {
      sessionStorage.setItem('vegetables',this.testCheckboxResult);
      sessionStorage.setItem('client',this.client);
      this.navCtrl.push(SecondPage);
    }
  	
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverOptionsPage);
    popover.present({
      ev: myEvent
    });
  } 
}
