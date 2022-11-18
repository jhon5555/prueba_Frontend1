import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {

  id: string = '';
  
 
  constructor(
    private servicioProducto: ProductoService,
    private router : Router, 
    private route : ActivatedRoute)
   { }

  ngOnInit(): void {
    this.id =  this.route.snapshot.params["id"];
    this.EliminarProducto();
    
   
  }
  

  EliminarProducto(){
    this.servicioProducto.EliminarProducto(this.id).subscribe((datos: any)=> {
      alert("Producto eliminado correctamente")
      this.router.navigate(["/administracion/listar-productos"]);
    }, (error: any)=> {
      alert("Error eliminando el producto");
      
    }) ;

  }

}
