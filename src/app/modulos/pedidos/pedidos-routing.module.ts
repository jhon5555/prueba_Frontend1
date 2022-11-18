  import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarPedidoComponent } from './buscar-pedido/buscar-pedido.component';
import { CrearPedidoComponent } from './crear-pedido/crear-pedido.component';
import { EditarPedidoComponent } from './editar-pedido/editar-pedido.component';
import { EliminarPedidoComponent } from './eliminar-pedido/eliminar-pedido.component';

const routes: Routes = [
  {
    path : 'crear-pedido',
    component: CrearPedidoComponent
    //canActivate: [ValidadorSesionGuard]
  },
  {
    path : 'editar-pedido/:id',
    component: EditarPedidoComponent
    //canActivate: [ValidadorSesionGuard]
  },
  {
    path : 'buscar-pedido',
    component: BuscarPedidoComponent
    //canActivate: [ValidadorSesionGuard]
  },
  {
    path : 'eliminar-pedido/:id',
    component: EliminarPedidoComponent
    //canActivate: [ValidadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
