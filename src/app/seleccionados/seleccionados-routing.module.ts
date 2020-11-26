import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionadosPage } from './seleccionados.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionadosPageRoutingModule {}
