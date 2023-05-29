import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoGetDTOmod } from 'src/app/modelo/ProductoGetDTOmod';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SharedService } from 'src/app/servicios/shared.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
    
  textoBtnEliminar: String = "";
  productos: ProductoGetDTOmod[];
  seleccionados: ProductoGetDTOmod[];
  alerta!: Alerta;
  objeto: any;
  email:any;

  constructor(private productoServicio: ProductoService, private sharedService:SharedService, private usuarioServicio: UsuarioService,private token: TokenService, private route: Router) {
    this.productos = [];
    this.seleccionados = [];
    this.objeto = this;
    this.sharedService.objeto = this.objeto;
    this.email=this.token.getEmail();
  }

  ngOnInit(): void {
    this.productoServicio.getProductosMod().subscribe({
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


   private actualizarMensaje() {
     const tam = this.seleccionados.length;
     if (tam != 0) {
       if (tam == 1) {
         this.textoBtnEliminar = "1 elemento";
       } else {
         this.textoBtnEliminar = tam + " elementos";
       }
     } else {
       this.textoBtnEliminar = "";
     }
   }

 public cambiarEstado(){
     this.seleccionados.forEach(productoSeleccionado => { 
       this.productoServicio.eliminarProducto(productoSeleccionado.codigo).subscribe();
       this.productos = this.productos.filter(i => i != productoSeleccionado);
     });
     this.seleccionados = []; 
     this.actualizarMensaje(); 
     }

    public getProductos(){
      this.productoServicio.getProductosMod().subscribe({
        next: data => {
          this.sharedService.updateObjeto(this.objeto);
          this.productos = data.respuesta;
          console.log(this.productos);
          },
          error: error => {
            this.objeto.alerta = new Alerta(error.error.respuesta, "danger");
          }
      });
    }
 
  }
  