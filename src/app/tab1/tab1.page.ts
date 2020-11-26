import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Categoria } from '../../models/categoria.models';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonList, Platform } from '@ionic/angular';
import { Tienda } from '../../models/tiendas.models';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild( IonList ) list: IonList;

  id: string;
  constructor(public service: ServiceService, private router: Router,
              private alertController: AlertController,
              private route: ActivatedRoute) {

                this.id = this.route.snapshot.parent.parent.paramMap.get( 'id' );
                // console.log('ruta hija ' + this.route.snapshot.parent.parent.url);
                // console.log('ruta hija2 ' + this.route.snapshot.parent.parent.paramMap.get( 'id' ));
              }

   async agregarCategoria(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Categoría',
      inputs: [
        {
          name: 'Titulo',
          type: 'text',
          placeholder: 'Nombre de la categoría'
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

            const listaId =  this.service.agregarNuevaCategoria(data.Titulo, Number( this.id ));
            this.router.navigateByUrl(`/tabs/${this.id}/tab1/seleccionados/${listaId}`);
          }

        }
      ]
    });
    alert.present();

  }

  obtenerCategoriasByTienda() {
    // console.log(this.service.obtenerCategoriasbyTienda(0));
    return this.service.obtenerCategoriasbyTienda(Number(this.id));

  }

  ngOnInit() {
    // AL CARGAR LA PAGINA MOSTRAMOS BANNER
       this.service.MostrarBanner();


   }

}
