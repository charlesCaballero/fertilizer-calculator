import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAlertPage } from './modal-alert';

@NgModule({
  declarations: [
    ModalAlertPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAlertPage),
  ],
})
export class ModalAlertPageModule {}
