import { Pipe, PipeTransform } from '@angular/core';
import { Tienda } from '../../models/tiendas.models';

@Pipe({
  name: 'getNombre',
  pure: false
})
export class GetNombrePipe implements PipeTransform {

  transform(data: Tienda[], ...args: unknown[]): unknown {
   // console.log(data[0].id + 'pipe');
    return data[0].nombre;
  }

}
