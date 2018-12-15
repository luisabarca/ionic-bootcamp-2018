import { FCM } from '@ionic-native/fcm';
import { DetallePage } from './../detalle/detalle';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  titulo: string = 'Taller';
  usuarios;
  map = '';

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public fcm: FCM,
    public toast: ToastController,
    ) {
    this.usuarios = [
      {
        id: 1,
        nombre: 'Valeria',
        edad: 6,
        image: 'assets/imgs/acapulco.jpg',
      },
      {
        id: 2,
        nombre: 'Luis',
        edad: 11,
        image: 'assets/imgs/taxco.jpg',
      },
      {
        id: 3,
        nombre: 'Juan',
        edad: 21,
        image: 'assets/imgs/chilpo.jpg',
      },
    ];
    
  }

  ionViewDidEnter(){
    this.fcm.subscribeToTopic('avisos');

    this.fcm.getToken().then(token => {
      console.warn(token);
    });
    
    this.fcm.onNotification().subscribe( data => {

      const toast = this.toast.create({
        message: data.body || 'Notification',
        duration: 3000,
        position: 'top',
      });

      if (data.wasTapped) {
        console.log("Received in background", data);
      } else {
        console.log("Received in foreground", data);
      };

      toast.present().then(() => {

      }).catch( () => {

      });

    });
    
    this.fcm.onTokenRefresh().subscribe(token => {
      console.warn(token);
    });
    
    //this.fcm.unsubscribeFromTopic('marketing');
  }

  saludo() {
    this.titulo = 'Taller 2018 ';

    this.geolocation.getCurrentPosition().then((resp) => {
      this.map = 'https://maps.googleapis.com/maps/api/staticmap?'
          + 'size=300x250'
          + '&maptype=hybrid'
          + '&zoom=15'
          + '&markers=color:blue|label:1|' 
          + resp.coords.latitude +',' + resp.coords.longitude 
          + '&mobile=true'
          + '&key=XXXX';

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  mostrarDetalle( id: number ) {
    console.log('Click', id);

    const params = {
      id: id,
      titulo: 'Detalle de ID ' + id,
    };

    this.navCtrl.push( DetallePage, params ).then( () => {
      console.log('OK');
    }).catch( (err) => {
      console.log('Error', err);
    });
  }

}
