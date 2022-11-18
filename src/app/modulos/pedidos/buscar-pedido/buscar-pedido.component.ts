import { Component, OnInit } from '@angular/core';
import { ModeloPedido } from 'src/app/modelos/pedido.modelo';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-buscar-pedido',
  templateUrl: './buscar-pedido.component.html',
  styleUrls: ['./buscar-pedido.component.css']
})
export class BuscarPedidoComponent implements OnInit {


listadoPedidos : ModeloPedido[]= [];

  constructor(private pedidoService : PedidoService) { }

  ngOnInit(): void {
    this.ObtenerListadoPedido();
  }
  ObtenerListadoPedido(){
    this.pedidoService.ObtenerPedidos().subscribe((datos: ModeloPedido[])=>{
      this.listadoPedidos= datos;
    })
  }

}
