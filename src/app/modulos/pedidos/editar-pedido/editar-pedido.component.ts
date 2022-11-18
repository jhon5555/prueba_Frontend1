import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPedido } from 'src/app/modelos/pedido.modelo';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.css']
})
export class EditarPedidoComponent implements OnInit {
  id : string = "";
  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'cantidad': ['', [Validators.required]],
    'fechaPedido': ['',[Validators.required]],
    'fechaEntrega': ['',[Validators.required]],
    'formasPago': ['',[Validators.required]],
    'estado': ['',[Validators.required]],
    'total' : ['',[Validators.required]]
   });
  constructor(private fb: FormBuilder, private servicioPedido: PedidoService,
     private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
  this.id =  this.route.snapshot.params["id"];
  this.BuscarPedido();
  }

  BuscarPedido(){

    this.servicioPedido.ObtenerPedidosPorId(this.id).subscribe((datos: ModeloPedido)=>{
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["cantidad"].setValue(datos.cantidad);
      this.fgValidador.controls["fechaPedido"].setValue(datos.fechaPedido);
      this.fgValidador.controls["fechaEntrega"].setValue(datos.fechaEntrega);
      this.fgValidador.controls["formasPago"].setValue(datos.formasPago);
      this.fgValidador.controls["estado"].setValue(datos.estado);
      this.fgValidador.controls["total"].setValue(datos.total);

    });
  }
  EditarPedido(){
    let cantidad =parseInt( this.fgValidador.controls["cantidad"].value);
    let fechaPedido = this.fgValidador.controls["fechaPedido"].value;
    let fechaEntrega = this.fgValidador.controls["fechaEntrega"].value;
    let formasPago = this.fgValidador.controls["formasPago"].value;
    let estado = this.fgValidador.controls["estado"].value;
    let total = parseInt(this.fgValidador.controls["total"].value);
    let p = new ModeloPedido();
    p.cantidad = cantidad;
    p.fechaPedido=  new Date(fechaPedido) ;
    p.fechaEntrega = new Date(fechaEntrega) ;
    p.formasPago= formasPago;
    p.estado= estado;
    p.total = total;
    p.id = this.id;
  this.servicioPedido.ActualizarPedido  (p).subscribe((datos: ModeloPedido)=> {
    alert("Pedido actualizado correctamente")
    this.router.navigate(["/pedidos/buscar-pedido"])
  }, (error: any)=> {
    alert("Error actualizando el pedido");
  })                                              
  }


}
