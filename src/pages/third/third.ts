import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import {PopoverOptionsPage} from '../popover-options/popover-options';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@IonicPage()
@Component({
  selector: 'page-third',
  templateUrl: 'third.html',
})
export class ThirdPage {

Nitr=parseInt(sessionStorage.getItem("RecN"));
Phos=parseInt(sessionStorage.getItem("RecP"));
Potas=parseInt(sessionStorage.getItem("RecK"));
vegetables=sessionStorage.getItem("vegetables");
client=sessionStorage.getItem("client");
userName=sessionStorage.getItem("username");

dateTime:any;
additionalCondition='';

selectedF:any =[];
CalculatedferN=[];
CalculatedferP=[];
CalculatedferK=[];

name_N=[];
name_P=[];
name_K=[];

nKilo=0;
pKilo=0;
kKilo=0;

subN=[];
subP=[];
subK=[];

price=0;
length=0;

  fertilizers: any = [];
  calculatedFertilizers: any = [];
  results: any = [];
  selectedFertilizers: any = [];
  count=0;
  norepeat=false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modal: ModalController,
    public popoverCtrl: PopoverController,
    private sqlite: SQLite) {
  }

  selected(i){
    this.count=0;
    this.selectedFertilizers.push(i);
    for(var x = this.selectedFertilizers.length - 1; x >= 0; x--) {
      if(this.selectedFertilizers[x] === i) {
         this.count++;
         if(this.count>1){
           this.selectedFertilizers.splice(x, 1);
           this.selectedFertilizers.pop();
         }

      }
    }
    console.log(this.selectedFertilizers);

  }

  ionViewDidLoad() {
  this.norepeat=false;
    console.log('ionViewDidLoad ThirdPage');
    this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
    }).then((db: SQLiteObject) => {
    db.executeSql('SELECT * FROM fertilizerList ORDER BY rowid ASC', {})
      .then(res => {
        this.fertilizers = [];
        for(var i=0; i<res.rows.length; i++) {
          this.fertilizers.push({rowid:res.rows.item(i).rowid,fname:res.rows.item(i).fname,nitr:res.rows.item(i).nitr,phos:res.rows.item(i).phos,potas:res.rows.item(i).potas,price:res.rows.item(i).price});
        }
      })
      .catch(e => console.log(e));

    }).catch(e => console.log(e));

  }

openInfo(rowid){
  const thisModal= this.modal.create('ModalInfoPage',{id:rowid});
  thisModal.present();
}

displayModal(){
  
  this.additionalCondition='rowid IN ('+this.selectedFertilizers+') AND';

  this.calculatedFertilizers= [];
  this.sqlite.create({
      name: 'fertilizer.db',
      location: 'default'
  }).then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM fertilizerList WHERE '+this.additionalCondition+' nitr>0 AND phos>0 AND potas>0', {})
        .then(res => {
          console.log('First Sql Executed');
          console.log('# rows' + res.rows.length);
      this.length=res.rows.length;

      if (res.rows.length<=0) {
        const thisModal= this.modal.create('ModalAlertPage');
        thisModal.present();
      }

      if ((this.Nitr<=this.Phos) && (this.Nitr<=this.Potas)) {

          this.CalculatedferN = [];
          for(var x=0; x<res.rows.length; x++) {
              this.nKilo=parseFloat((this.Nitr/(res.rows.item(x).nitr/100)).toFixed(1));
              this.subK[x]= (this.Potas-(res.rows.item(x).potas*this.nKilo/100)).toFixed(1);
              this.subP[x]= (this.Phos-(res.rows.item(x).phos*this.nKilo/100)).toFixed(1);
              this.CalculatedferN[x] = this.nKilo;
            this.name_N[x]=res.rows.item(x).fname;
            this.price=parseFloat(res.rows.item(x).price);
            if (this.subP[x]<=0) {
              this.CalculatedferP[x]=0;
              this.calPotas(this.subK[x],x);
            }
            else if(this.subK[x]<=0){
              this.CalculatedferK[x]=0;
              this.calPhos(this.subP[x],x);
            }
            else{this.testA(this.subP[x],this.subK[x],x);}

          }

      }
      else if ((this.Phos<=this.Nitr) && (this.Phos<=this.Potas)) {

          this.CalculatedferP = [];
          for(var x=0; x<res.rows.length; x++) {
              // this.fertilizers.push({nitr:res.rows.item(i).nitr,phos:res.rows.item(i).phos,potas:res.rows.item(i).potas})
              this.pKilo=parseFloat((this.Phos/(res.rows.item(x).phos/100)).toFixed(1));
              this.subK[x]= (this.Potas-(res.rows.item(x).potas*this.pKilo/100)).toFixed(1);
              this.subN[x]= (this.Nitr-(res.rows.item(x).nitr*this.pKilo/100)).toFixed(1);
              this.CalculatedferP[x] = this.pKilo;
            this.name_P[x]=res.rows.item(x).fname;
            this.price=parseFloat(res.rows.item(x).price);

            if (this.subN[x]<=0) {
              this.CalculatedferN[x]=0;
              this.calPotas(this.subK[x],x);
            }
            else if(this.subK[x]<=0){
              this.CalculatedferK[x]=0;
              this.calNitr(this.subN[x],x);
            }
            else{this.testB(this.subN[x],this.subK[x],x);}

          }


      }
      else if((this.Potas<=this.Phos) && (this.Potas<=this.Nitr)){

          this.CalculatedferK = [];
          for(var x=0; x<res.rows.length; x++) {
              this.kKilo=parseFloat((this.Potas/(res.rows.item(x).potas/100)).toFixed(1));
              this.subP[x]= (this.Phos-(res.rows.item(x).phos*this.kKilo/100)).toFixed(1);
              this.subN[x]= (this.Nitr-(res.rows.item(x).nitr*this.kKilo/100)).toFixed(1);
              this.CalculatedferK[x] = this.kKilo;
            this.name_K[x]=res.rows.item(x).fname;
            this.price=parseFloat(res.rows.item(x).price);

            if (this.subN[x]<=0) {
              this.CalculatedferN[x]=0;
              this.calPhos(this.subP[x],x);
            }
            else if(this.subP[x]<=0){
              this.CalculatedferP[x]=0;
              this.calNitr(this.subN[x],x);
            }
            else{this.testC(this.subN[x],this.subP[x],x);}

          }


      }
      else{

      }

      })
      .catch(e => console.log(e));



  }).catch(e => console.log(e));

  }

testA(x,y,z){
  console.log("Test A");
    this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM fertilizerList WHERE '+this.additionalCondition+' nitr=0 AND phos>0 and potas>0', {})
    .then(res => {
      console.log('Second Sql Executed');
      console.log("this.subN:"+x);
      console.log("this.subK:"+y);
      console.log("iteration:"+z);
      if (res.rows.length<=0) {
        const thisModal= this.modal.create('ModalAlertPage');
        thisModal.present();
      }

      for(var i=0; i<res.rows.length; i++) {
            if (x<=y) {
              console.log('P < K');
              this.pKilo=parseFloat((x/(res.rows.item(i).phos/100)).toFixed(1));
              y= (y-(res.rows.item(i).potas*this.pKilo/100)).toFixed(1);
              console.log("this.pKilo: "+this.pKilo);
              this.CalculatedferP[z] = this.pKilo;
              this.name_P[z]=res.rows.item(i).fname;
              this.price+=parseFloat(res.rows.item(i).price);
              console.log("this.CalculatedferP ["+z+"]["+i+"]: "+this.CalculatedferP);
              if(y<=0){
                    this.CalculatedferK[z] = 0;
                    this.displayRes(z);
              }
              else{this.calPotas(y,z);}

            }else{
              console.log('K < P');
              this.kKilo=parseFloat((y/(res.rows.item(i).potas/100)).toFixed(1));
              x= (x-(res.rows.item(i).phos*this.kKilo/100)).toFixed(1);
              console.log("this.kKilo: "+this.kKilo);
              this.CalculatedferK[z] = this.kKilo;
              this.name_K[z]=res.rows.item(i).fname;
              this.price+=parseFloat(res.rows.item(i).price);
              console.log("this.CalculatedferK ["+z+"]["+i+"]: "+this.CalculatedferK);
              if(x<=0){
                  this.CalculatedferP[z] = 0;
                  this.displayRes(z);
              }
              else{this.calPhos(x,z);}

            }

          }

    })
    .catch(e => console.log(+e));
  }).catch(e => console.log(+e));

}

testB(x,y,z){
    console.log("Test B");
    this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM fertilizerList WHERE '+this.additionalCondition+' nitr>0 AND phos=0 and potas>0', {})
    .then(res => {
      if (res.rows.length<=0) {
        const thisModal= this.modal.create('ModalAlertPage');
        thisModal.present();
      }

      for(var i=0; i<res.rows.length; i++) {
        console.log('TestB # rows :' + res.rows.length);
            if (x<=y) {
          console.log('N < K');
              this.nKilo=parseFloat((x/(res.rows.item(i).nitr/100)).toFixed(1));
              y= (y-(res.rows.item(i).potas*this.nKilo/100)).toFixed(1);
              this.CalculatedferN[z] = this.nKilo;
            this.name_N[z]=res.rows.item(i).fname;
            this.price+=parseFloat(res.rows.item(i).price);
            console.log("this.CalculatedferN ["+z+"]["+i+"]: "+this.CalculatedferN);
          if(y<=0){
                this.CalculatedferK[z] = 0;
                this.displayRes(z);
          }
          else{this.calPotas(y,z);}

            }else{
          console.log('K < N');
              this.kKilo=parseFloat((y/(res.rows.item(i).potas/100)).toFixed(1));
              x= (x-(res.rows.item(i).nitr*this.kKilo/100)).toFixed(1);
              this.CalculatedferK[z] = this.kKilo;
              this.name_K[z]=res.rows.item(i).fname;
            // console.log("this.CalculatedferK ["+z+"]["+i+"]: "+this.CalculatedferK);
              if(x<=0){
                    this.CalculatedferN[z] = 0;
                    this.displayRes(z);
              }
              else{this.calNitr(x,z);}

            }

          }

    })
    .catch(e => console.log(e));
  }).catch(e => console.log(e));
}

testC(x,y,z){
    // console.log("Test C");
    this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM fertilizerList WHERE '+this.additionalCondition+' nitr>0 AND phos>0 and potas=0', {})
    .then(res => {
      if (res.rows.length<=0) {
        const thisModal= this.modal.create('ModalAlertPage');
        thisModal.present();
      }

      for(var i=0; i<res.rows.length; i++) {
            if (x>=y) {
          // console.log('N > P');
              this.pKilo=parseFloat((y/(res.rows.item(i).phos/100)).toFixed(1));
              x= (x-(res.rows.item(i).nitr*this.pKilo/100)).toFixed(1);
              this.CalculatedferP[z] = this.pKilo;
              this.name_P[z]=res.rows.item(i).fname;
              this.price+=parseFloat(res.rows.item(i).price);
              // console.log("this.CalculatedferP ["+z+"]["+i+"]: "+this.Calculatedferthis.Phos);
              if(x<=0){
                    this.CalculatedferN[z] = 0;
                    this.displayRes(z);
              }
              else{this.calNitr(x,z);}


            }else{
          // console.log('N < P');
              this.nKilo=parseFloat((x/(res.rows.item(i).nitr/100)).toFixed(1));
              y= (y-(res.rows.item(i).phos*this.nKilo/100)).toFixed(1);
              this.CalculatedferN[z] = this.nKilo;
              this.name_N[z]=res.rows.item(i).fname;
              this.price+=parseFloat(res.rows.item(i).price);
              // console.log("this.CalculatedferN ["+z+"]["+i+"]: "+this.CalculatedferN);
              if(y<=0){
                    this.CalculatedferP[z] = 0;
                    this.displayRes(z);
              }
              else{this.calPhos(y,z);}


            }

          }

    })
    .catch(e => console.log(e));
  }).catch(e => console.log(e));
}

calNitr(q,w){
    this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('SELECT * FROM fertilizerList WHERE '+this.additionalCondition+' nitr>0 AND phos=0 and potas=0', {})
      .then(res => {
      // console.log('calNitr # rows :' + res.rows.length);
      if (res.rows.length<=0) {
        const thisModal= this.modal.create('ModalAlertPage');
        thisModal.present();
      }

        for(var c=0; c<res.rows.length; c++) {
          // this.fertilizers.push({rowid:res.rows.item(i).rowid,fname:res.rows.item(i).fname,nitr:res.rows.item(i).nitr,phos:res.rows.item(i).phos,potas:res.rows.item(i).potas,price:res.rows.item(i).price})
        this.nKilo=parseFloat((q/(res.rows.item(c).nitr/100)).toFixed(1));
        this.CalculatedferN[w]=this.nKilo ;
      this.name_N[w]=res.rows.item(c).fname;
      this.price+=parseFloat(res.rows.item(c).price);
      // console.log("this.CalculatedferK ["+z+"]["+c+"]: "+this.CalculatedferK);

      this.displayRes(w);

        }
      })
      .catch(e => console.log(+e));

  }).catch(e => console.log(e));
 
}

calPhos(q,w){
  // console.log("calPhos");
    this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('SELECT * FROM fertilizerList WHERE '+this.additionalCondition+' nitr=0 AND phos>0 and potas=0', {})
      .then(res => {
      // console.log('Third Sql Executed');
      // this.CalculatedferK = [];
      if (res.rows.length<=0) {
        const thisModal= this.modal.create('ModalAlertPage');
        thisModal.present();
      }
        for(var c=0; c<res.rows.length; c++) {
        this.pKilo=parseFloat((q/(res.rows.item(c).phos/100)).toFixed(1));
        this.CalculatedferP[w]=this.pKilo ;
      this.name_P[w]=res.rows.item(c).fname;
      this.price+=parseFloat(res.rows.item(c).price);
      // console.log("this.CalculatedferP ["+w+"]["+c+"]: "+this.Calculatedferthis.Phos);
      this.displayRes(w);

        }
      })
      .catch(e => console.log(e));

  }).catch(e => console.log(e));

}

calPotas(q,w){
  // console.log("calPotas");
    this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('SELECT * FROM fertilizerList WHERE '+this.additionalCondition+' nitr=0 AND phos=0 and potas>0', {})
      .then(res => {
      // console.log('Third Sql Executed');
      // this.CalculatedferK = [];
        for(var c=0; c<res.rows.length; c++) {
        this.kKilo=parseFloat((q/(res.rows.item(c).potas/100)).toFixed(1));
        this.CalculatedferK[w]=this.kKilo ;
      this.name_K[w]=res.rows.item(c).fname;
      this.price+=parseFloat(res.rows.item(c).price);
      // console.log("this.CalculatedferK ["+w+"]["+c+"]: "+this.CalculatedferK);
      this.displayRes(w);

        }
      })
      .catch(e => console.log("1"+e));

  }).catch(e => console.log(e));

}

displayRes(index){
  console.log("this.name_N["+index+"] "+this.name_N[index]+"this.name_P["+index+"] "+this.name_P[index]+"this.name_K["+index+"] "+this.name_K[index]);
  this.calculatedFertilizers.push({
    nameN:this.name_N[index],
    nameP:this.name_P[index],
    nameK:this.name_K[index],
    nitrC:this.CalculatedferN[index],
    phosC:this.CalculatedferP[index],
    potasC:this.CalculatedferK[index],
    price:this.price
  });
  console.log('index: '+ index);
  console.log('length: '+ this.length);
  if (index===this.length-1 && this.norepeat===false) {
    this.norepeat=true;
    this.dateTime=new Date();

    this.sqlite.create({
    name: 'fertilizer.db',
    location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM fertilizerList WHERE rowid IN ('+this.selectedFertilizers+')', {})
      .then(res =>{ 
        this.selectedF = [];
        for(var i=0; i<res.rows.length; i++) {
          this.selectedF.push(res.rows.item(i).fname);
        }
      })
      .catch(e => console.log(e.message)); 


      db.executeSql('INSERT INTO `activitylogs`( `uname`, `activity`, `date`) VALUES ("'+this.userName+'","Calculated land sample of '+this.client+' with Recommended N='+this.Nitr+', P='+this.Phos+', K='+this.Potas+' from STK.","'+this.dateTime.toUTCString()+'")', {})
      .then(res =>{ 
        console.log('Inserted Succesfully into activitylog! the fuck! ');
      })
      .catch(e => console.log(e.message));  

    }).catch(e => console.log(e.message));

    const thisModal= this.modal.create('ModalresultPage',{data:this.calculatedFertilizers});
    thisModal.present();
  }

}

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverOptionsPage);
    popover.present({
      ev: myEvent
    });
  }

}
