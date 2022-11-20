import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloUsuario } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  id: string = '';
  fgValidador: FormGroup = this.fb.group({
    'id': ['',[Validators.required]],
    'nombres': ['',[Validators.required]],
    'apellidos': ['',[Validators.required]],
    'celular': ['',[Validators.required]],
    'ciudad': ['',[Validators.required]],
    'correo': ['',[Validators.required]],
    'direccion': ['',[Validators.required]],
    'rol': ['',[Validators.required]],
    'clave': ['',[Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private servicioUsuario: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarUsuario();
  }

  BuscarUsuario() {
    this.servicioUsuario.ObtenerRegistrosUsuarioPorId(this.id).subscribe((datos: ModeloUsuario) => {
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["nombres"].setValue(datos.nombres);
      this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
      this.fgValidador.controls["celular"].setValue(datos.celular);
      this.fgValidador.controls["ciudad"].setValue(datos.ciudad);
      this.fgValidador.controls["correo"].setValue(datos.correo);
      this.fgValidador.controls["direccion"].setValue(datos.direccion);
      this.fgValidador.controls["rol"].setValue(datos.rol);
     
    });
  }

  EditarUsuario(){
    let nombres = this.fgValidador.controls['nombres'].value;
    let apellidos = this.fgValidador.controls['apellidos'].value;
    let celular = this.fgValidador.controls['celular'].value;
    let ciudad = this.fgValidador.controls['ciudad'].value;
    let correo = this.fgValidador.controls['correo'].value;
    let direccion = this.fgValidador.controls['direccion'].value;
    let rol = this.fgValidador.controls['rol'].value;
    
    let u = new ModeloUsuario();
    u.nombres = nombres;
    u.apellidos = apellidos;
    u.celular = celular;
    u.ciudad = ciudad;
    u.correo = correo;
    u.direccion = direccion;
    u.rol = rol;
    
    u.id = this.id

    this.servicioUsuario.ActualizarUsuario(u).subscribe((datos: ModeloUsuario) => {
      alert("Usuario actualizado correctamente.");
      this.router.navigate(["/administracion/listar-usuarios"]);
    },(error: any)=> {
      alert("Error actualizando el usuario.");
    })
  }

}
