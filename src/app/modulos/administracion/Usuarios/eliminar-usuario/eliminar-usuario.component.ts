import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloUsuario } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {
  id: string = '';
  fgValidador: FormGroup = this.fb.group({
    'id': ['',[Validators.required]],
    'nombres': ['',[Validators.required]],
    'apellidos': ['',[Validators.required]],
    'celular': ['',[Validators.required]],
    'ciudad': ['',[Validators.required]],
    'correo': ['',[Validators.required]],
    'direccion': ['',[Validators.required]],
    'rol': ['',[Validators.required]]
   
  });
  constructor(private fb: FormBuilder,
    private servicioUsuario: UsuarioService,
    private router : Router,
    private route : ActivatedRoute)
   { }

  ngOnInit(): void {
    this.id =  this.route.snapshot.params["id"];
    this.EliminarUsuario();
    this.BuscarUsuario();

  }
  BuscarUsuario(){
    this.id = this.route.snapshot.params["id"];
    this.servicioUsuario.ObtenerRegistrosUsuarioPorId(this.id).subscribe((datos: ModeloUsuario) => {
     if(datos){
      this.fgValidador.controls["id"].setValue(datos.id);
      this.fgValidador.controls["nombres"].setValue(datos.nombres);
      this.fgValidador.controls["dapellidos"].setValue(datos.apellidos);
      this.fgValidador.controls["celular"].setValue(datos.celular);
      this.fgValidador.controls["ciudad"].setValue(datos.ciudad);
      this.fgValidador.controls["correo"].setValue(datos.correo);
      this.fgValidador.controls["direccion"].setValue(datos.direccion);
      this.fgValidador.controls["rol"].setValue(datos.rol);
      
     }
    });

  }

  EliminarUsuario(){
    if(confirm('Seguro quiere eliminar el Usuario')){
      this.servicioUsuario.EliminarUsuario(this.id).subscribe((datos: any)=> {
        alert("Usuario eliminado correctamente");
        this.router.navigate(["/administracion/listar-usuarios"]);
     }, (error: any)=> {
        alert("Error eliminando el Usuario");
     }) ;
   }else{
      alert("No se elimini al usuario");
      this.router.navigate(["/administracion/listar-usuarios"]);
   }
  }
}
