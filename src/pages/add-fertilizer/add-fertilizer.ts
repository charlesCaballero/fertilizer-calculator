import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ViewController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {HomePage} from '../home/home';
import { ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
 
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the AddFertilizerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-add-fertilizer',
  templateUrl: 'add-fertilizer.html',
})
export class AddFertilizerPage {
fertilizerName='';
addN:number=null;
addP:number=null;
addK:number=null;
fertilizerPrice:number=null;
fertilizerPic:string =null;
dateTime:any;
lastImage: string = null;
loading: Loading;
userName=sessionStorage.getItem("username");

  constructor(
  	public navCtrl: NavController, 
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
   	private sqlite: SQLite
   	) {}

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
    this.fertilizerPic=cordova.file.dataDirectory+newFileName;
    
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


  addFertilizer(){

  	if (this.fertilizerName=='' || this.fertilizerPic==null || this.fertilizerPrice==null || this.addN == null || this.addP==null || this.addK==null) { 
  		let myalert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Please make sure to fill-in all inputs!',
            buttons: ['Dismiss']
          });
  		myalert.present();
  	} 
  	else if(this.addN<0 || this.addP<0 || this.addK<0 ) {
  		let myalert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Values allowed in N, P, K, are zero(0) and above only.',
            buttons: ['Dismiss']
          });
  		myalert.present();
  	}
  	else if(this.fertilizerPrice<=0){
  		let myalert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Price should never be zero(0) or below.',
            buttons: ['Dismiss']
          });
  		myalert.present();
  	}
  	else{
	  	this.sqlite.create({
	    name: 'fertilizer.db',
	    location: 'default'
	    }).then((db: SQLiteObject) => {
	    db.executeSql('INSERT INTO `fertilizerList`( `fname`, `nitr`, `phos`, `potas`, `price`, `fertilizer_pic`) VALUES ("'+this.fertilizerName+'",'+this.addN+','+this.addP+','+this.addK+','+this.fertilizerPrice+',"'+this.fertilizerPic+'")', {})
	      .then(res => {

	      this.dateTime= new Date();
	      console.log(this.dateTime);

	      	db.executeSql('INSERT INTO `activitylogs`( `uname`, `activity`, `date`) VALUES ("'+this.userName+'","ADDED a Fertilizer: '+this.fertilizerName+'","'+this.dateTime.toUTCString()+'")', {})
		      .then(res =>{ 
		          console.log('Inserted Succesfully in activitylogs add!');
		      })
		      .catch(e => console.log(e.message));

	        	let alert = this.alertCtrl.create({
				    title: 'Fertilizer Added',
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
				        text: 'Add More',
				        handler: () => {
				        	this.fertilizerName='';
							this.addN=null;
							this.addP=null;
							this.addK=null;
							this.fertilizerPrice=null;
							this.fertilizerPic='';
				          	this.ionViewDidLoad();
				        }
				      }
				    ]
				});
				alert.present();
	      })
	      .catch(e => console.log(e));

	    }).catch(e => console.log(e));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFertilizerPage');
  }

  closeModal(){
  this.view.dismiss();
}

}
