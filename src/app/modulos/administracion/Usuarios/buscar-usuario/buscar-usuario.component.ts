import { Component, OnInit } from '@angular/core';
import { ModeloUsuario } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent implements OnInit {
  listadoRegistrosUsuarios: ModeloUsuario[] = [];
  constructor(private usuarioServicio: UsuarioService) { }

  ngOnInit(): void {
    this.ObtenerListadoUsuarios();
  }

  ObtenerListadoUsuarios() {
    this.usuarioServicio.ObtenerRegistrosUsuario().subscribe((datos: ModeloUsuario[]) => {
      this.listadoRegistrosUsuarios = datos;
    })
  }

}
