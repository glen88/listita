import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../../models/categoria.models';
import { AlertController, IonInput, IonList } from '@ionic/angular';
import { Producto } from '../../models/producto.model';


@Component({
  selector: 'app-seleccionados',
  templateUrl: './seleccionados.page.html',
  styleUrls: ['./seleccionados.page.scss'],
})
export class SeleccionadosPage implements OnInit {
  @ViewChild( IonList ) list: IonList;
  // @ViewChild('i') i;


  categoria: Categoria;
   id: string;
  constructor(public service: ServiceService, private alertController: AlertController, private route: ActivatedRoute) {
     this.id = route.snapshot.paramMap.get('id');
     this.categoria = service.obtenerListaById(this.id);
     console.log(this.categoria.productos);
  }

  buscar(valor: string) {
    console.log( valor);
  //  return this.categoria.productos.filter(p => p.nombre === valor);

  }
  // focus( event) {
  //   // this.i.nativeElement;
  //   this.i.getInputElement().select();
    
  // }

 async editarNombreProducto(producto: Producto){
    let id: number;
    id = Number(this.id);

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar nombre producto',
      inputs: [
        {
          name: 'Titulo',
          type: 'text',
          value: producto.nombre
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

            this.service.actualizaNombreProducto(id, data.Titulo, producto.id);
            this.list.closeSlidingItems();
          }

        }
      ]
    });
    alert.present();

  }

  async agregarProductos(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nuevo producto',
      inputs: [
        {
          name: 'Titulo',
          type: 'text',
          placeholder: 'Nombre del producto'
        }
      ]
      ,
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
            console.log(data);
            if (data.Titulo.length === 0){
              return;
            }

            const listaId =  this.service.agregarProductos(this.id, data.Titulo);
           // this.router.navigateByUrl(`/tabs/tab1/seleccionados/${listaId}`);
          }

        }
      ]
    });
    alert.present();

  }

  ngOnInit() {
    // AL CARGAR LA PAGINA MOSTRAMOS BANNER
      // this.service.MostrarBanner();
    }

  borrarProducto(id: number)
  {
    let idCategoria: number;
    idCategoria = Number(this.id);
    this.service.borrarProducto(idCategoria, id);

  }

}
