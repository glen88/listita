import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from 'src/models/producto.model';

@Pipe({
  name: 'buscaProductos',
  pure: false
})
export class BuscaProductosPipe implements PipeTransform {

  transform(productos: Producto[], nombre: string = ''): Producto[] {
// console.log(`busca-productos: nombreL : ${nombre.length}`);
    if (nombre.length > 0 ) {
      return productos.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }
    else
    {
      return productos;
    }
  }

}
