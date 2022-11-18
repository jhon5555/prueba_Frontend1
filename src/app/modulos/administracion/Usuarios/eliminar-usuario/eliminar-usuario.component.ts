import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {
  id: string = '';

  constructor(
    private servicioUsuario: UsuarioService,
    private router : Router, 
    private route : ActivatedRoute)
   { }

  ngOnInit(): void {
    this.id =  this.route.snapshot.params["id"];
    this.EliminarUsuario();
    
   
  }
  

  EliminarUsuario(){
    this.servicioUsuario.EliminarUsuario(this.id).subscribe((datos: any)=> {
      alert("usuario eliminado correctamente")
      this.router.navigate(["/administracion/listar-usuario"]);
    }, (error: any)=> {
      alert("Error eliminando el usuario");
      
    }) ;

  }
}
