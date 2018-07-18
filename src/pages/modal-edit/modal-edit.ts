import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {HomePage} from '../home/home';
import {EditFertilizerPage} from '../edit-fertilizer/edit-fertilizer';
import { ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
 
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the ModalEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
  declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-modal-edit',
  templateUrl: 'modal-edit.html',
})
export class ModalEditPage {
datas='';
editFertilizerName;
oldFertilizerName;
editN;
editP;
editK;
editFertilizerPrice;
currentFertilizerPic: string=null;
dateTime:any;
lastImage: string = null;
loading: Loading;
userName=sessionStorage.getItem("username");

  constructor(public navCtrl: NavController, 
  	private view: ViewController,
    private alertCtrl: AlertController,
    private camera: Camera, 
    private transfer: FileTransfer, 
    private file: File, 
    private filePath: FilePath, 
    public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, 
    public platform: Platform, 
    public loadingCtrl: LoadingController,
  	private sqlite: SQLite,
  	public navParams: NavParams) {
  }

  ionViewWillLoad(){
  	this.datas = this.navParams.get('data');
  	console.log('ionViewDidLoad HomePage');
    this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
    }).then((db: SQLiteObject) => {
    db.executeSql('SELECT * FROM `fertilizerList` WHERE rowid='+this.datas+'', {})
    .then(res =>{ 
      this.editFertilizerName=res.rows.item(0).fname;
    	this.oldFertilizerName=res.rows.item(0).fname;
	  	this.editN=res.rows.item(0).nitr;
	  	this.editP=res.rows.item(0).phos;
	  	this.editK=res.rows.item(0).potas;
      this.editFertilizerPrice=res.rows.item(0).price;
	  	this.currentFertilizerPic=res.rows.item(0).fertilizer_pic;
      
    })
    .catch(e => console.log(e));
    
    }).catch(e => console.log(e));
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalEditPage');
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
  // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
   
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    // alert("namepath: "+namePath);
    // alert("currentName: "+currentName);
    // alert("directory: "+cordova.file.dataDirectory);
    // alert("newFileName: "+newFileName);
    this.currentFertilizerPic=cordova.file.dataDirectory+newFileName;
    
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
   
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
   
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  saveEditFertilizer(){
  	console.log('ionViewDidLoad HomePage');
    this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
    }).then((db: SQLiteObject) => {
    db.executeSql('UPDATE `fertilizerList` SET `fname`="'+this.editFertilizerName+'",`price`='+this.editFertilizerPrice+',`nitr`='+this.editN+',`phos`='+this.editP+',`potas`='+this.editK+',`fertilizer_pic`="'+this.currentFertilizerPic+'" WHERE rowid='+this.datas+'', {})
    .then(res =>{ 

        this.dateTime= new Date();
        console.log(this.dateTime);
        
        db.executeSql('INSERT INTO `activitylogs`( `uname`, `activity`, `date`) VALUES ("'+this.userName+'","EDITED a Fertilizer: '+this.oldFertilizerName+'","'+this.dateTime.toUTCString()+'")', {})
        .then(res =>{ 
            console.log('Inserted Succesfully in activitylogs add!');
        })
        .catch(e => console.log(e.message));

	      let alert = this.alertCtrl.create({
			    title: 'Fertilizer Information Updated!',
			    message: 'What do want to do next?',
			    buttons: [
			      {
			        text: 'Go Back',
			        role: 'cancel',
			        handler: () => {
			          this.navCtrl.push(HomePage);
			        }
			      },
			      {
			        text: 'Edit More',
			        handler: () => {
			        	
			          	this.navCtrl.push(EditFertilizerPage);
			        }
			      }
			    ]
			});
			alert.present();
      
    })
    .catch(e => console.log(e));
    
    }).catch(e => console.log(e));
  }

closeModal(){
	this.view.dismiss();
}


}
