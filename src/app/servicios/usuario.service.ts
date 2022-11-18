import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModeloUsuario } from '../modelos/usuario.modelo';
import { SeguridadService } from './seguridad.service';
import { Observable } from 'rxjs';
import { ModeloProducto } from '../modelos/producto.modelo';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url=  'http://localhost:3000';
  token: String = '';

  constructor(private http: HttpClient,private seguridadServicio: SeguridadService) { 
      this.token = this.seguridadServicio.ObtenerToken();
    }
  

  ObtenerRegistros(): Observable<ModeloUsuario[]> {
    return this.http.get<ModeloUsuario[]>(`${this.url}/usuarios`);
  }
  ObtenerRegistrosPorId(id: string): Observable<ModeloUsuario> {
    return this.http.get<ModeloUsuario>(`${this.url}/usuarios/${id}`);
  }

  CrearUsuario(usuario : ModeloUsuario): Observable<ModeloUsuario>{
    return this.http.post<ModeloUsuario>(`${this.url}/usuarios`, usuario,{
      headers: new HttpHeaders({
       'Authorization': `Bearer ${this.token}`
      })
    })
  }
  ActualizarUsuario(usuario : ModeloUsuario): Observable<ModeloUsuario>{
    return this.http.put<ModeloProducto>(`${this.url}/usuarios/${usuario.id}`, usuario,{
      headers: new HttpHeaders({
       'Authorization': ` Bearer ${this.token}`
      })
    })
  }
  EliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.url}/usuarios/${id}`,{
      headers: new HttpHeaders({
       'Authorizacion': ` Bearer ${this.token}`
      })
    })
  }
}
