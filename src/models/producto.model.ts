export class Producto {

    nombre: string;
    cantidad: number;
    seleccionado: boolean;
    id: number;
    um: string;
    precio: number;
    subtotal: number;
    comprado: boolean;

    constructor(nombre: string, id?: number) {
        this.nombre = nombre;
        this.cantidad = 0;
        this.precio = 0;
        this.seleccionado = false;
        if (id === null){
            this.id = new Date().getTime();
        }
        else{
            this.id = id;
        }
    }
}
