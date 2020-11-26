import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { stringify } from 'querystring';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  @Input() pantalla: string;
  @Input() datos: [];
  @ViewChild( IonList ) list: IonList;



  constructor(private router: Router, private alertController: AlertController,
              public service: ServiceService) {
              }
// ok
  seleccionador(item: any){
    if ( this.pantalla === 'categoria')
    {
      this.router.navigateByUrl(`/tabs/${item.tiendaId}/tab1/seleccionados/${item.id}`);
    }
    else {
      this.router.navigateByUrl(`/tabs/${item.id}/tab1`);
    }
  }


  borrar( datos ){
    console.log(`borrar: ${datos}`);
    this.pantalla === 'categoria' ? this.service.borrarCategoria(datos.id) : this.service.eliminarTiendas(datos.id);

  }

  async actualizar( datos){
    let encabezado: string;
    this.pantalla === 'categoria' ? encabezado = ' categoría ' : encabezado = ' de La Tienda';
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: `Editar nombre ${ encabezado }`,
      inputs: [
        {
          name: 'Titulo',
          type: 'text',
          value : datos.nombre
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            if (data.Titulo.length === 0){
              return;
            }
            //  console.log(data.Titulo);

            this.pantalla === 'categoria' ? this.service.actualizarNombreCategoria(datos.id, data.Titulo) :
           this.service.actualizarNombreTienda(data.Titulo, datos.id);

            // this.service.actualizarNombreCategoria(datos.id, data.Titulo, datos.idTienda);
             // this.router.navigateByUrl('/');
            this.list.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }

  agregarItemList(){
  }

  ngOnInit() {
      // AL CARGAR LA PAGINA MOSTRAMOS BANNER
      //   this.service.MostrarBanner();
  }

}
