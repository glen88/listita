import { Injectable } from '@angular/core';
import { Categoria } from '../../models/categoria.models';
import { Producto } from '../../models/producto.model';
// IMPORTAMOS PLATFORM PARA PODER ARRANCAR ADMOB CUANDO LA APLICACION ESTE LISTA.
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { Tienda } from '../../models/tiendas.models';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  categorias: Categoria[] = [];
  tiendas: Tienda[] = [];


  constructor(private admobFree: AdMobFree) {
    this.cargarStorage();
   }

   MostrarBanner() {

     // CONFIGURACION DEL BANNER
    const bannerConfig: AdMobFreeBannerConfig = {
      autoShow: true, // ,
      // isTesting: true,
      // bannerAtTop: true,
      // overlap: true,
      id: 'ca-app-pub-1449864164151196/3079274155'
     };
    this.admobFree.banner.config(bannerConfig);

    // COMPROBAR Y MOSTRAR EL BANNER
    this.admobFree.banner.prepare().then(() => {
    console.log('BANNER CARGADO CORRECTAMENTE');
    }).catch(e =>
      {
    console.log('PROBLEMA CARGANDO BANNER: ', e);
    setTimeout(() => {
         console.log('intentaria cargar el banner de nuevo');
       }, 3500);
      }
    );
  }

    // ok
   agregarNuevaCategoria(titulo: string, idTienda: number){
     const nuevaCate = new Categoria(titulo, null, idTienda);
     if (idTienda){
       console.log('tiene tienda');
     }
     else{
      nuevaCate.tiendaId = 0;
     }
     this.categorias.push(nuevaCate);
     this.guardarStorage();
     return nuevaCate.id;

   }

   // ok
   actualizarNombreCategoria(id: number, nombre: string){

    this.categorias.filter(c =>
      {
        if (c.id === id  )
        {
          c.nombre = nombre;
        }
      });
    this.guardarStorage();

   }

   obtenerCategoriasbyTienda( idTienda: number) {
    // console.log(this.categorias.filter(c => c.tiendaId === idTienda ));
    return this.categorias.filter(c => c.tiendaId === idTienda );
  }

   actualizaNombreProducto(id: number, nombre: string, productId: number)
   {
     this.categorias.filter(p => {
       if ( p.id === id){
         p.productos.filter(i => {
          if (i.id === productId)
          {
            i.nombre = nombre;
          }
         });
       }
     });
     this.guardarStorage();
   }

   // ok
   borrarCategoria(id: number){
    this.categorias = this.categorias.filter(data => (data.id !== id  ));
    this.guardarStorage();
  }

  // ok
  borrarProducto(idCategoria: number, idProducto: number){

    this.categorias.filter(c => {
      if ( c.id === idCategoria)
      {
        c.productos = c.productos.filter(p => p.id !== idProducto);

      }
    });

  }


    agregarProductos(id: number| string, titulo: string){
      id = Number(id);
      this.categorias.filter( lista => {
        if (lista.id === id){
          console.log('entro aqui');
          const prod = new Producto(titulo, null);
          lista.productos.push(prod);
          // console.log(lista.productos);
        }
      });
      this.guardarStorage();

    }

    // ok
   countProductosSeleccionados(idTienda: number){
    //  console.log(idTienda);
     let total: number;
     let sumatoria = 0;
     this.categorias.forEach(data => {
       if (data.tiendaId === idTienda) {
              total = data.productos.filter(i => i.seleccionado === true).length;
              sumatoria = sumatoria + total;
       }
       return  sumatoria;
    });
    //  console.log(sumatoria +  'sumatoria');
     this.guardarStorage();
     return sumatoria;
    }

    // ok
    productosSeleccionados(idTienda: number){

      return this.categorias.filter(data => data.tiendaId === idTienda);
    }

    resetCantidad(producto: Producto) {
      console.log('aqui entro al onchange' + producto.nombre);
      producto.cantidad = 0;
      producto.precio = 0;
      producto.subtotal = 0;
      // if (!producto.seleccionado) {
      // }
      this.guardarStorage();
    }

    obtenerListaById(id: number | string){
      id = Number(id);
      return this.categorias.find( listData => listData.id === id);
    }

    // ok
    guardarStorage(){
       localStorage.setItem('c', JSON.stringify(this.categorias));
       localStorage.setItem('tiendas', JSON.stringify(this.tiendas));
    }
    // ok
    cargarStorage(){

      // version Anterior conservar las categorias sin tienda
      if ( localStorage.getItem('categorias')){
         this.categorias = JSON.parse( localStorage.getItem('categorias'));
         this.categorias.forEach(c => c.tiendaId = 0);
        //  console.log(this.categorias);
         this.agregarTienda('Mi tienda preferida', 0 );
         localStorage.removeItem('categorias');
      }
      // nueva version con tiendas
      if ( localStorage.getItem('tiendas')){
        this.tiendas = JSON.parse( localStorage.getItem('tiendas'));
        // console.log('cargo storage de la tienda');
      }
      // nueva version con tiendas
      if ( localStorage.getItem('c')){
        this.categorias = JSON.parse( localStorage.getItem('c'));
      }
      if (this.tiendas.length === 0){
        console.log('cargo la data del pred');
        this.agregarTienda('Mi tienda preferida', 0 );
        this.categorias = this.obtenerListaPredetermida();
      }

    }

  obtenerListaPredetermida(){

    // for (const element of departamentos )
    // {
      for (let index = 0; index < departamentos.length; index++)
       {
         const element = departamentos[index];
         const nombre: string = element.replace(/\s/g, '');
         const categoria = new Categoria(element, index, 0 );
         if ( nombre === 'FrutasyVerduras')
         {
           for (let a = 0; a <  FrutasyVerdura.length; a ++)
           {
             const i = FrutasyVerdura[a];
             const product = new Producto(i, a);
             categoria.productos.push(product);
        }
      }
         if ( nombre === 'Carnes'){
             for (let a = 0; a < Carnes.length; a ++){
              const i = Carnes[a];
              const product = new Producto(i, a);
              categoria.productos.push(product);
        }
      }
         if ( nombre === 'PolloyPescado'){
             for (let a = 0; a < PolloyPescado.length; a ++){
              const i = PolloyPescado[a];
              const product = new Producto(i, a);
              categoria.productos.push(product);
        }
      }
         if ( nombre === 'Condimentos'){
            for (let a = 0; a < Condimentos.length; a ++){
            const i = Condimentos[a];
            const product = new Producto(i, a);
            categoria.productos.push(product);
   }
 }
         if ( nombre === 'Limpieza'){
            for (let a = 0; a < Limpieza.length; a ++){
            const i = Limpieza[a];
            const product = new Producto(i, a);
            categoria.productos.push(product);
          }
        }
         if ( nombre === 'Lácteos'){
          for (let a = 0; a < Lacteos.length; a ++){
          const i = Lacteos[a];
          const product = new Producto(i, a);
          categoria.productos.push(product);
        }
      }

         this.categorias.push(categoria);
    }
   // console.log(this.categorias);
      this.guardarStorage();
      return this.categorias;
  }

    // ok
  agregarTienda(nombre: string, id: number ){
    // console.log('llego a agregar tienda');
    const tienda = new Tienda(nombre, id );
    this.tiendas.push(tienda);
    // console.log(this.tiendas);
    this.guardarStorage();
    // console.log('guardo storage');

    return tienda.id;

  }

  actualizarNombreTienda(nombre: string, tiendaId: number) {
    // console.log('llego aqui al nombre de la tienda' + nombre);
    return this.tiendas.filter(tienda => {
      if ( tienda.id === tiendaId) {
        tienda.nombre = nombre;
      }
    });
    this.guardarStorage();
  }

  eliminarTiendas(id: number | string) {
    let idTienda: number;
    idTienda = Number(id);
    this.tiendas = this.tiendas.filter(data => data.id !== idTienda);
    // console.log('se eliminaran categorías de la tienda: ' + idTienda);
    this.categorias = this.categorias.filter(data => (data.tiendaId !== idTienda  ));
    this.guardarStorage();

  }

  obtenerTienda(id: number | string) {
    let idTienda: number;
    idTienda = Number(id);
    // console.log( `tiendaID de obtener ${idTienda}`);
    return  (this.tiendas.filter(t => t.id === idTienda));
  }

  setTotalTienda(id: number | string, subtotal: number) {
    let idTienda: number;
    idTienda = Number(id);
    console.log( `total  ${subtotal}`);
    this.tiendas.find(t => {
      if ( t.id === idTienda ) {
        t.total = subtotal;
      }
    }
    );
    this.guardarStorage();
  }

  getTotalTienda(id: number | string) {
    let idTienda: number;
    idTienda = Number(id);
    let total = 0;
    // console.log( `tiendaID de obtener ${idTienda}`);
    this.tiendas.find(t => {
              if ( t.id === idTienda ) {
              return  total =  t.total;
              }
    }
    );
    console.log('total tienda:' + total);
    return total;
  }


}


const departamentos: string[] = [
  'Frutas y Verduras',
  'Carnes',
  'Pollo y Pescado',
  'Lácteos',
  'Condimentos',
  'Limpieza'
];

const Limpieza: string[] = [
 'Jabón de manos',
 'Jabón para trastes',
 'Trapeador',
 'Escoba',
 'Jabón para ropa'
];


const Condimentos: string[] = [
  'Sal',
  'Pimienta',
  'Canela'
 ];

const Lacteos: string[] = [
  'Leche',
  'Yogurt griego',
  'Yogurt light'

];

const FrutasyVerdura: string[] = [
  'Manzana',
  'Plátanos',
  'Pera',
  'Mango',
  'Melón',
  'Uvas',
  'Pasas',
  'Cereza',
  'Sandía',
  'Piña',
  'Kiwi',
  'Cebolla',
  'Naranja',
  'Pimientos (verde, amarillo)',
  'Jitomates',
  'Chiles',
  'Papa',
  'Calabacita',
  'Zanahoria',
  'Lechuga',
  'Pepinos',
];


const PolloyPescado: string[] = [
  'Milanesa de pollo',
  'Pierna de Pollo',
  'Pechuga de Pollo'
];

const Carnes: string[] = [
  'Milanesa Res',
  'Carne molida',
  'Carne para asar'
];



