import { Pipe, PipeTransform } from '@angular/core';
import { Categoria } from '../../models/categoria.models';

@Pipe({
  name: 'filtaSeleccionado',
  pure : false
})
export class FiltaSeleccionadoPipe implements PipeTransform {

   transform(categoria: Categoria[], ...args: unknown[]): unknown {
    return categoria.filter(p => p.productos.find(i => i.seleccionado === true));
  }


}
