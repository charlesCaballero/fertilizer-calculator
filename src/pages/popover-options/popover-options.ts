import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ViewController } from 'ionic-angular';

import {AddFertilizerPage} from '../add-fertilizer/add-fertilizer';
import {EditFertilizerPage} from '../edit-fertilizer/edit-fertilizer';
import {DeleteFertilizerPage} from '../delete-fertilizer/delete-fertilizer';

/**
 * Generated class for the PopoverOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-options',
  templateUrl: 'popover-options.html',
})
export class PopoverOptionsPage {

  constructor(
    public navCtrl: NavController, 
    private view: ViewController,
    public navParams: NavParams,
    public menuCtrl: MenuController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverOptionsPage');
  }

  openAdd(){
    this.view.dismiss();
  	this.navCtrl.push(AddFertilizerPage);
  }

  openEdit(){
    this.view.dismiss();
  	this.navCtrl.push(EditFertilizerPage);
  }

  openDelete(){
    this.view.dismiss();
  	this.navCtrl.push(DeleteFertilizerPage);
  }

   openMenu(){
      this.view.dismiss();
      this.menuCtrl.open();
    }
}
