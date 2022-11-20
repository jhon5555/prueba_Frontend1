import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloUsuario } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
    'nombres': ['',[Validators.required]],
    'apellidos': ['',[Validators.required]],
    'celular': ['',[Validators.required]],
    'ciudad': ['',[Validators.required]],
    'correo': ['',[Validators.required]],
    'direccion': ['',[Validators.required]],
    'rol': ['',[Validators.required]]
    
  })

  constructor(private fb: FormBuilder,
    private servicioUsuario: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  GuardarUsuario(){
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
    

    this.servicioUsuario.CrearUsuario(u).subscribe((datos: ModeloUsuario) => {
      alert("Usuarios almacenado correctamente.");
      this.router.navigate(["/administracion/listar-usuarios"]);
    },(error: any)=> {
      alert("Error almacenando el usuario.");
    })
  }

}
