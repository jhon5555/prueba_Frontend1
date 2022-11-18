import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloUsuario } from 'src/app/modelos/usuario.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  id: string = '';
  fgValidador: FormGroup = this.fb.group({
    'nombres': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'celular': ['', [Validators.required]],
    'cuidad': ['', [Validators.required]],
    'correo': ['', [Validators.required]],
    'direccion': ['', [Validators.required]],
    'rol': ['', [Validators.required]],
    'clave': ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder,
    private servicioUsuario: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarUsuario();
  }
  BuscarUsuario() {
    this.servicioUsuario.ObtenerRegistrosPorId(this.id).subscribe((datos: ModeloUsuario) => {
      this.fgValidador.controls["id"].setValue(datos.id);
      this.fgValidador.controls["nombres"].setValue(datos.nombres);
      this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
      this.fgValidador.controls["celular"].setValue(datos.celular);
      this.fgValidador.controls["cuidad"].setValue(datos.cuidad);
      this.fgValidador.controls["correo"].setValue(datos.correo);
      this.fgValidador.controls["direccion"].setValue(datos.direccion);
      this.fgValidador.controls["rol"].setValue(datos.rol);
      this.fgValidador.controls["clave"].setValue(datos.clave);
    });


  }

  EditarUsuario() {
    let nombres = this.fgValidador.controls["nombres"].value;
    let apellidos = this.fgValidador.controls[" apellidos"].value;
    let celular = this.fgValidador.controls["celular"].value;
    let cuidad = this.fgValidador.controls["cuidad"].value;
    let correo = this.fgValidador.controls["correo"].value;
    let direccion = this.fgValidador.controls["direccion"].value;
    let rol = this.fgValidador.controls[" rol"].value;
    let clave = this.fgValidador.controls["clave"].value;
    let u = new ModeloUsuario();
    u.nombres = nombres;
    u.apellidos = apellidos;
    u.celular = celular;
    u.cuidad = cuidad;
    u.correo = correo;
    u.direccion = direccion;
    u.rol = rol;
    u.clave = clave;
    u.id = this.id;
    this.servicioUsuario.ActualizarUsuario(u).subscribe((datos: ModeloUsuario) => {
      alert("usuario actualizado correctamente");
      this.router.navigate(["/administracion/listar-usuarios"]);

    }, (error: any) => {
      alert("Error actualizanfdo el usuario");
    })
  }

}
