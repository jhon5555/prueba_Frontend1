import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
 id: string = '';
  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'nombre': ['', [Validators.required]],
    'descripcion': ['', [Validators.required]],
    'precioVenta': ['', [Validators.required]],
    'stock': ['', [Validators.required]],
    'imagen': ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarProducto();
  }
  BuscarProducto(){
    this.servicioProducto.ObtenerRegistrosPorId(this.id).subscribe((datos: ModeloProducto) => {
      this.fgValidador.controls["id"].setValue(datos.id);
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["descripcion"].setValue(datos.descripcion);
      this.fgValidador.controls["precionVenta"].setValue(datos.precioVenta);
      this.fgValidador.controls["imagen"].setValue(datos.imagen);
    });

  
  }

  EditarProducto() {
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
    p.id = this.id;
    this.servicioProducto.ActualizarProducto(p).subscribe((datos: ModeloProducto) => {
      alert("Producto actualizado correctamente");
      this.router.navigate(["/administracion/listar-productos"]);

    }, (error: any) => {
      alert("Error actualizanfdo el producto");
    })
  }

}
