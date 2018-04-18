import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpClient } from "@angular/common/http";
import { URLSearchParams } from "@angular/http";

/**
 * Generated class for the PrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {
  datosMonedero:any = []
  constructor
  (
    public navCtrl: NavController,
    public navParams: NavParams,
    private http:HttpClient,
    private barcodeScanner:BarcodeScanner,
  ){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
     if(barcodeData.cancelled==true)
     {
       alert("Proceso cancelado");
     }
     else{
       var num_card=barcodeData.text;
       var headers = new Headers();
       let urlSearchParams = new URLSearchParams();

       let url="http://185.3.166.10/monedero/public/validate";
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       this.http.post(url,{numcard:num_card})
       .subscribe(response=>{
         this.datosMonedero=response;
    })
     }
     }).catch(err => {
       console.log('Error', err);
     })
     }

}
