import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltaSeleccionadoPipe } from './filta-seleccionado.pipe';
import { ProdSeleccionadosPipe } from './prod-seleccionados.pipe';
import { GetNombrePipe } from './get-nombre.pipe';
import { BuscaProductosPipe } from './busca-productos.pipe';
import { OrdenAZPipe } from './orden-az.pipe';



@NgModule({
  declarations: [FiltaSeleccionadoPipe, ProdSeleccionadosPipe, GetNombrePipe, BuscaProductosPipe, OrdenAZPipe],
  imports: [
    CommonModule
  ],
  exports: [
    FiltaSeleccionadoPipe,
    ProdSeleccionadosPipe,
    GetNombrePipe,
    BuscaProductosPipe,
    OrdenAZPipe
  ],
})
export class PipesModule { }
