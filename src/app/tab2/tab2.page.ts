  import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ServiceService } from '../services/service.service';
  import { Categoria } from '../../models/categoria.models';
  import { ActivatedRoute } from '@angular/router';
  import { Producto } from '../../models/producto.model';

  @Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  id: string;
  sleccionados: Categoria[];
  total = 0;

  constructor(public service: ServiceService, private route: ActivatedRoute) {
    // console.log('ruta hija2 ' + this.route.snapshot.parent.parent.paramMap.get( 'id' ));
    this.id = this.route.snapshot.parent.parent.paramMap.get( 'id' );
    // this.total = this.service.getTotalTienda(this.id);
  }


  productosSeleccionados() {
    return this.service.productosSeleccionados(Number(this.id));
  }

  countProductosSeleccionados()
  {
    return this.service.countProductosSeleccionados(Number(this.id));

  }
  ionViewWillEnter() {
    this.total = this.service.getTotalTienda(this.id);
  }
  ionViewWillLeave(){
   const prdSeleccionados = this.countProductosSeleccionados();
   if ( prdSeleccionados <= 0 ) {
    this.service.setTotalTienda(this.id, 0);
  }
}

  obtienteTotal(producto: Producto) {
    this.total = this.total + producto.subtotal;
    this.service.setTotalTienda(this.id, this.total);
    // console.log('subtotal' + producto.subtotal);
    // console.log('total' + this.total);
    this.service.resetCantidad(producto);
  }


  calculaPrecio(productos: Producto) {

    productos.subtotal = productos.cantidad * productos.precio;

  }
  ngOnInit() {
    // AL CARGAR LA PAGINA MOSTRAMOS BANNER
     //   this.service.MostrarBanner();
      // console.log('cargó el on init ');

}
}
