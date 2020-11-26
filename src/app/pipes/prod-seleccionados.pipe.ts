import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../../models/producto.model';

@Pipe({
  name: 'prodSeleccionados',
  pure : false
})
export class ProdSeleccionadosPipe implements PipeTransform {

  transform(productos: Producto[]): Producto[] {
    return productos.filter(p => p.seleccionado === true);
  }

}
