import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
     'nombre': ['',[Validators.required]],
     'descripcion': ['',[Validators.required]],
     'precioVenta': ['',[Validators.required]],
     'stock': ['',[Validators.required]],
     'imagen': ['',[Validators.required]]
  });
  constructor(private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router: Router) { }

  ngOnInit(): void {
  }
 GuardarProducto(){
  let nombre = this.fgValidador.controls["nombre"].value;
  let descripcion = this.fgValidador.controls["descripcion"].value;
  let precioVenta = parseInt(this.fgValidador.controls["precioVenta"].value);
  let stock = parseInt(this.fgValidador.controls["stock"].value);
  let imagen = this.fgValidador.controls["imagen"].value;
  let p = new ModeloProducto();
  p.nombre = nombre;
  p.descripcion = descripcion;
  p.precioVenta = precioVenta;
  p.stock = stock;
  p.imagen = imagen;
  this.servicioProducto.CrearProducto(p).subscribe((datos: ModeloProducto) => {
    alert("Producto almacenado correctamente");
    this.router.navigate(["/administracion/listar-productos"]);

  }, (error: any) => {
    alert("Error almacenando el producto");
  })
 }
}
