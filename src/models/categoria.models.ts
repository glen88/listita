import { Producto } from './producto.model';

export class Categoria {

    nombre: string;
    productos: Producto[];
    id: number;
    tiendaId: number;

    constructor(nombre: string, id: number, tiendaId?: number) {
        this.nombre = nombre;
        this.productos = [];
        if (id === null){
            console.log('entro al if ');
            this.id = new Date().getTime();
        }
        else{
            this.id = id;
        }
        this.tiendaId = tiendaId;
    }
}
