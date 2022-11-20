import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloUsuarioClave } from 'src/app/modelos/usuarioClave';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html',
  styleUrls: ['./cambio-clave.component.css']
})
export class CambioClaveComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
    'usuario': ['', [Validators.required, Validators.email]],
   
   });
  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router) { }

  ngOnInit(): void {
  }
  GeneracionClave(){
    let usuario = this.fgValidador.controls["usuario"].value;
    this.servicioSeguridad.CambioClave(usuario).subscribe((datos: ModeloUsuarioClave)=>{
      alert(`${datos.nombres} hemos enviado una clave a tu correo electronico`)
      this.router.navigate(["/inicio"]);
    }, (error: any) => {
      // KO
      alert("usuario Inválido")
    })
  }

}
