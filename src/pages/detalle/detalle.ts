import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the DetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {
  id;
  titulo;
  articulos;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    ) {
  }

  ionViewDidEnter() {
    const loading = this.loadingCtrl.create({
      content: 'Cargando, por favor espere...',
    });

    loading.present();

    const url = 'https://jsonplaceholder.typicode.com/photos';

    this.http.get( url ).subscribe( (datos: any) => {
      console.log('Datos', datos );
      this.articulos = datos.slice(0, 20);
      loading.dismiss();
    }, (err) => {
      console.warn('No hay datos', err);
    });

  }

}
