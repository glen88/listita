import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionadosPageRoutingModule } from './seleccionados-routing.module';

import { SeleccionadosPage } from './seleccionados.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionadosPageRoutingModule,
    PipesModule
  ],
  declarations: [SeleccionadosPage]
})
export class SeleccionadosPageModule {}
