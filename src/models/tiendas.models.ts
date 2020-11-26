import { Categoria } from './categoria.models';

export class Tienda {
    id: number;
    nombre: string;
    total: number;

    constructor(nombre: string, id?: number) {
        // console.log(id + 'id que viene de la llamda ');
        this.total = 0;
        if (id === null || id === undefined){
            this.id = new Date().getTime();
        }
        else{
            this.id = id;
        }
        this.nombre = nombre;

    }

}
