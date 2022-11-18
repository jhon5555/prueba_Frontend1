import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { BuscarProductoComponent } from './productos/buscar-producto/buscar-producto.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './productos/eliminar-producto/eliminar-producto.component';
import { BuscarUsuarioComponent } from './Usuarios/buscar-usuario/buscar-usuario.component';
import { CrearUsuarioComponent } from './Usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './Usuarios/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './Usuarios/eliminar-usuario/eliminar-usuario.component';


const routes: Routes = [
  {
    path : 'crear-usuario',
    component: CrearUsuarioComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-usuario',
    component: EditarUsuarioComponent,
    canActivate: [ValidadorSesionGuard]
  },
 {
  path: "listar-productos",
  component: BuscarProductoComponent,
  canActivate: [ValidadorSesionGuard]
 },
 {
  path: "listar-usuarios",
  component: BuscarUsuarioComponent,
  canActivate: [ValidadorSesionGuard]
 },
  {
    path : 'crear-producto',
    component: CrearProductoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-producto/:id',
    component: EditarProductoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-usuario/:id',
    component: EditarUsuarioComponent,
    canActivate: [ValidadorSesionGuard]
  },

  {
    path : 'eliminar-producto/:id',
    component: EliminarProductoComponent
    //canActivate: [ValidadorSesionGuard]
  },
  {
    path : 'eliminar-usuario/:id',
    component: EliminarUsuarioComponent
    //canActivate: [ValidadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
