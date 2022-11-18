import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPedido } from 'src/app/modelos/pedido.modelo';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-eliminar-pedido',
  templateUrl: './eliminar-pedido.component.html',
  styleUrls: ['./eliminar-pedido.component.css']
})
export class EliminarPedidoComponent implements OnInit {
  id : string = "";
  constructor(private servicioPedido: PedidoService,
    private router : Router, private route : ActivatedRoute)
   { }

  ngOnInit(): void {
    this.id =  this.route.snapshot.params["id"];
    this.EliminarPedido();
   
  }

  EliminarPedido(){
    this.servicioPedido.EliminarPedido(this.id).subscribe((datos: any)=> {
      alert("Pedido eliminado correctamente")
      this.router.navigate(["/pedidos/buscar-pedido"])
    }, (error: any)=> {
      alert("Error eliminando el pedido");
      this.router.navigate(["/pedidos/buscar-pedido"])
    }) ;

  }

}
