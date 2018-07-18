import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFertilizerPage } from './add-fertilizer';

@NgModule({
  declarations: [
    AddFertilizerPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFertilizerPage),
  ],
})
export class AddFertilizerPageModule {}
