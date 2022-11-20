import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloUsuarioClave } from 'src/app/modelos/usuarioClave';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'usuario': ['', [Validators.required, Validators.email]],
    'clave': ['',[Validators.required]]
   });
   
  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router) { }

  ngOnInit(): void {
  }

  CambioClave(){
    let usuario = this.fgValidador.controls["usuario"].value;
    let clave = this.fgValidador.controls["clave"].value;
    this.servicioSeguridad.CambioClaveUsuario(usuario, clave).subscribe((datos: ModeloUsuarioClave)=>{
      alert(`${datos.nombres}, hemos recibido con exito tu clave, por lo cual la hemos enviado a tu correo electronico`)
      this.router.navigate(["/inicio"]);
    }, (error: any) => {
      // KO
      alert("Disculpa, ha habido un error, intenta nuevamente")
    })

  }

}
