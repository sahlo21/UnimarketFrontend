import { Component, OnInit } from '@angular/core';
import { ProductoGetDTO } from 'src/app/modelo/ProductoGetDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SharedService } from 'src/app/servicios/shared.service';

@Component({
  selector: 'app-listar-todos-productos',
  templateUrl: './listar-todos-productos.component.html',
  styleUrls: ['./listar-todos-productos.component.css']
})
export class ListarTodosProductosComponent implements OnInit {
  productos: ProductoGetDTO[];
  objeto: any;

  constructor(private productoServicio: ProductoService,  
    private sharedService:SharedService){
    this.productos = [];
    this.objeto = this;
  }

  ngOnInit(): void {
    this.getProductos();
  }

  public getProductos(){
      
    this.productoServicio.getProductos().subscribe({
      next: data => {
        this.objeto.alerta = new Alerta(data.respuesta, "success");
        this.sharedService.updateObjeto(this.objeto);
        this.productos = data.respuesta;
        },
        error: error => {
          this.objeto.alerta = new Alerta(error.error.respuesta, "danger");
        }
    });
  }

  guardarCodigoProducto(codigo: number){
    this.sharedService.codigoProducto = codigo;
    console.log(codigo);
  }
}
