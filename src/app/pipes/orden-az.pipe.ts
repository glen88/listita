import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../../models/producto.model';

@Pipe({
  name: 'ordenAZ',
  pure: false
})
export class OrdenAZPipe implements PipeTransform {

  transform(datos: any[] ): any[] {
    return datos.sort((dato1, dato2) => {
      return this.compareObjects(dato1, dato2, 'nombre');
    });
  }

  compareObjects( object1: [], object2: [], key: string) {
    const obj1 = object1[key].toUpperCase();
    const obj2 = object2[key].toUpperCase();
    if (obj1 < obj2) {
      return -1;
    }
    if (obj1 > obj2) {
      return 1;
    }
    return 0;
  }

}
