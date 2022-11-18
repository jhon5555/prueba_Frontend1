import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPedido } from 'src/app/modelos/pedido.modelo';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})
export class CrearPedidoComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
    'cantidad': ['', [Validators.required]],
    'fechaPedido': ['',[Validators.required]],
    'fechaEntrega': ['',[Validators.required]],
    'formasPago': ['',[Validators.required]],
    'estado': ['',[Validators.required]],
    'total' : ['',[Validators.required]]
   });
  constructor(private fb: FormBuilder, private servicioPedido: PedidoService,
     private router : Router) { }

  ngOnInit(): void {
  }
  GuardarPedido(){
    let cantidad =parseInt( this.fgValidador.controls["cantidad"].value);
    let fechaPedido = this.fgValidador.controls["fechaPedido"].value;
    let fechaEntrega = this.fgValidador.controls["fechaEntrega"].value;
    let formasPago = this.fgValidador.controls["formasPago"].value;
    let estado = this.fgValidador.controls["estado"].value;
    let total = parseInt(this.fgValidador.controls["total"].value);
    
    let p = new ModeloPedido();
    p.cantidad = cantidad;
    p.fechaPedido = new Date(fechaPedido) ;
    p.fechaEntrega = new Date(fechaEntrega);
    p.formasPago= formasPago;
    p.estado= estado;
    p.total = total;
  this.servicioPedido.CrearPedido(p).subscribe((datos: ModeloPedido)=> {
    alert("Pedido almacenado correctamente")
    this.router.navigate(["/pedidos/buscar-pedido"])
  }, (error: any)=> {
    alert("Error almacenando el pedido");
  })                                              
  }

}
