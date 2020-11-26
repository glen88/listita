import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {

  constructor( public service: ServiceService,
               private alertController: AlertController,
               private ruta: Router) { }

ngOnInit() {
// AL CARGAR LA PAGINA MOSTRAMOS BANNER
this.service.MostrarBanner();
}

 async agregarTienda()
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Tienda',
      inputs: [
        {
          name: 'Titulo',
          type: 'text',
          placeholder: 'Nueva Tienda'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: ( data ) => {
            if (data.Titulo.length === 0){
              return;
            }

            const listaId =  this.service.agregarTienda(data.Titulo, null);
          }

        }
      ]
    });
    alert.present();

  }
  ionViewWillEnter()
  {
    this.service.MostrarBanner();
  }
}
