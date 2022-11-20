import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModeloIdentificar } from '../modelos/identificar.modelo';
import { ModeloUsuarioClave } from '../modelos/usuarioClave';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  url = 'http://localhost:3000';
  datosUsuarioEnSesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());
  constructor(private http: HttpClient) {
      this.VerificarSesionActual();
   }

   VerificarSesionActual(){
     let datos = this.ObtenerInformacionSesion();
     if(datos){
      this.RefrescarDatosSesion(datos);
     }
   }

   RefrescarDatosSesion(datos: ModeloIdentificar){
     this.datosUsuarioEnSesion.next(datos);
   }
   ObtenerDatosUsuarioEnSesion(){
    return this.datosUsuarioEnSesion.asObservable();
   }
Identificar(usuario: string, clave: string): Observable<ModeloIdentificar>{
   
    return this.http.post<ModeloIdentificar>(`${this.url}/identificarUsuario`, {
      usuario: usuario,
      clave: clave
    },{
      headers: new HttpHeaders({
        
      })
    })
}
AlmacenarSesion(datos: ModeloIdentificar) {
  datos.estaIdentificado = true;
  let stringDatos = JSON.stringify(datos);
  localStorage.setItem("datosSesion", stringDatos);
   this.RefrescarDatosSesion(datos);
}
ObtenerInformacionSesion(){
  let datosString = localStorage.getItem("datosSesion");
  if(datosString){
    let datos = JSON.parse(datosString);
    return datos;
  }else{
    return null;
  }
}
EliminarInformacionSesion(){
  localStorage.removeItem("datosSesion");
  this.RefrescarDatosSesion(new ModeloIdentificar());
}
seHaInciadoSesion(){
  let datosString = localStorage.getItem("datosSesion");
   return datosString;
}
ObtenerToken(){
  let datosString = localStorage.getItem("datosSesion");
  if(datosString){
    let datos = JSON.parse(datosString);
    return datos.tk;
  }else{
   return '';
  }
}
CambioClave(usuario: string): Observable<ModeloUsuarioClave>{
  return this.http.post<ModeloUsuarioClave>(`${this.url}/actualizacionClaveBySystem`, {
    usuario: usuario,
  
  },{
    headers: new HttpHeaders({
     
     })
  })
}
CambioClaveUsuario(usuario: string, clave: string): Observable<ModeloUsuarioClave>{
  return this.http.post<ModeloUsuarioClave>(`${this.url}/actualizacionClaveByUsuario`, {
    usuario: usuario,
    clave : clave
  },{
    headers: new HttpHeaders({
     
     })
  })
}

}

