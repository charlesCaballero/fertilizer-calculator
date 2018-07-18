import { Component, ViewChild } from '@angular/core';
import { Platform, Events, AlertController, Nav, MenuController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
// import { Events, Nav } from '../../../../src';

import { LoginPage } from '../pages/login/login';
import { ActivityLogPage } from '../pages/activity-log/activity-log';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // @ViewChild(ViewController) view: ViewController;
  rootPage:any = LoginPage;
  rowid: any = '';
  fName: any = '';
  lName: any = '';
  userPic:any = '';
  location:any = '';
  dateTime:any;
  userName=sessionStorage.getItem("username");
  

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private sqlite: SQLite, 
    public menuCtrl: MenuController,
    private alertCtrl: AlertController,
    public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      
    this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
    }).then((db: SQLiteObject) => {
    console.log('i wuz here');
    // alert('i wuz here');
    db.executeSql('CREATE TABLE IF NOT EXISTS Paratechnicians(rowid INTEGER PRIMARY KEY, uname TEXT UNIQUE, fname TEXT, lname TEXT, pass TEXT, pic TEXT, location TEXT)', {})
      .then(res =>{ 
        db.executeSql('SELECT * FROM `Paratechnicians`', {})
        .then(res =>{ 
          console.log(res.rows.length);
          // alert('res.rows.length'+res.rows.length);

           if (res.rows.length<=0) { 
            db.executeSql("INSERT INTO `Paratechnicians` (`uname`, `fname`, `lname`, `pass`, `pic`, `location`) VALUES"+
            " ('laxson', 'FELIX', 'NACALABAN', '123QWE', 'felix.jpg', 'Lirongan'),"+
            " ('pabs', 'PABLENCIO', 'LUCAS', '123QWE', 'pablencio.jpg', 'Lirongan'),"+
            " ('neneng', 'MARIBEL', 'DAUGAN', '123QWE', 'maribel.jpg', 'Miarayon'),"+
            " ('pipin', 'PENWIL', 'LIRA', '123QWE', 'penwil.jpg', 'Lirongan'),"+
            " ('ryan', 'RYAN', 'DANTO', '123QWE', 'ryan.jpg', 'Miarayon'),"+
            " ('rits', 'RITA', 'MEMPER', '123QWE', 'rita.jpg', 'Miarayon'),"+
            " ('jong', 'JOBERT', 'LAYOCAN', '123QWE', 'jobert.jpg', 'Lirongan'),"+
            " ('dondon', 'MANUEL', 'SABURNIDO', '123QWE', 'manuel.jpg', 'Miarayon'),"+
            " ('joy', 'MARYJOY', 'ASILAN', '123QWE', 'maryjoy.jpg', 'Miarayon');"  , {})
            .then(res => {
              console.log('Data Inserted to Table!');
              // alert('Data Inserted to Table!');
            })
            .catch(e => alert('para'+e.message));
          }
          else{ console.log('Not doing anything.')}
          
        })
        .catch(e => alert('3RD SQL:'+e.message));
        
      })
      .catch(e => alert('2ND SQL:'+e.message));

  db.executeSql('CREATE TABLE IF NOT EXISTS activitylogs(rowid INTEGER PRIMARY KEY, uname TEXT, activity TEXT, date TEXT)', {})
      .then(res =>{ 
        console.log('created table');
        // alert('created table');
      })
      .catch(e => alert(e.message));    
    
    }).catch(e => alert('1ST SQL:'+e.message));


    });

    this.listenToLoginEvents();

  }

  listenToLoginEvents(){
      this.events.subscribe('user:login', (rowid,fname,lname,pic,location,time) => {
        // console.log('Welcome ', user, ' at ', time, ' with', pic);
        this.rowid=rowid;
        this.fName=fname;
        this.lName=lname;
        this.userPic=pic;
        this.location=location;
      });
   }
  
  logout(){

    this.dateTime= new Date();
    console.log(this.dateTime);

    this.sqlite.create({
      name: 'fertilizer.db',
      location: 'default'
      }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO `activitylogs`( `uname`, `activity`, `date`) VALUES ("'+this.userName+'","LOGGED-OUT","'+this.dateTime.toUTCString()+'")', {})
          .then(res =>{ 
              console.log('Inserted Succesfully in activitylogs logout!');
          })
          .catch(e => console.log(e.message));
      }).catch(e => console.log(e.message));

      this.menuCtrl.close();
      this.nav.setRoot(LoginPage);
  }

  activityLogs(){
      this.menuCtrl.close();
    this.nav.push(ActivityLogPage);
  }

  changePassword(){
  let alert = this.alertCtrl.create({
    title: 'Change Password',
    inputs: [
      {
        name: 'currentPassword',
        placeholder: 'Current Passwrod',
        type: 'password'
      },
      {
        name: 'newPassword',
        placeholder: 'New Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          if (data.currentPassword!='' && data.newPassword!='') {
            this.sqlite.create({
              name: 'fertilizer.db',
              location: 'default'
              }).then((db: SQLiteObject) => {
              db.executeSql('SELECT * FROM Paratechnicians WHERE rowid='+this.rowid+'', {})
                .then(res => {
                  if (data.currentPassword==res.rows.item(0).pass) { 
                    db.executeSql('UPDATE `Paratechnicians` SET `pass`="'+data.newPassword+'" WHERE rowid='+this.rowid+'', {})
                    .then(res => {
                      let alert = this.alertCtrl.create({
                        title: 'Success!',
                        subTitle: 'You have succesfully changed your password. Please remember you new password.',
                        buttons: ['Dismiss']
                      });
                      alert.present();
                    })
                    .catch(e => console.log(e.message));
                  } else {
                    let alert = this.alertCtrl.create({
                      title: 'Incorrect Password!',
                      subTitle: 'Your current password input does not match to your password in database',
                      buttons: ['Dismiss']
                    });
                    alert.present();
                  }
                })
                .catch(e => console.log(e.message));

              }).catch(e => console.log(e.message));
          } else {
            let alert = this.alertCtrl.create({
              title: 'Input Needed!',
              subTitle: 'Please don\'t leave the input fields blank.',
              buttons: ['Dismiss']
            });
            alert.present();
            return false;
          }
        }
      }
    ]
  });
  alert.present();
  }
}

