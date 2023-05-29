import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoGetDTO } from 'src/app/modelo/ProductoGetDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SharedService } from 'src/app/servicios/shared.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {
  textoBtnEliminar: String = "";
  productos: ProductoGetDTO[];
  seleccionados: ProductoGetDTO[];
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
    this.getProductosVendedor();
  }

  public seleccionar(producto: ProductoGetDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(producto);
    } else {
      this.seleccionados = this.seleccionados.filter(i => i != producto);
    }
    this.actualizarMensaje();
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

  public borrarProductos(){ 
    this.seleccionados.forEach(productoSeleccionado => { 
      this.productoServicio.eliminarProducto(productoSeleccionado.codigo).subscribe();
      this.productos = this.productos.filter(i => i != productoSeleccionado);
    });
    this.seleccionados = []; 
    this.actualizarMensaje(); 
    }

    public getProductos(){
      this.productoServicio.getProductos().subscribe({
        next: data => {
          this.sharedService.updateObjeto(this.objeto);
          //this.productoServicio.listar();
          this.productos = data.respuesta;
          },
          error: error => {
            this.objeto.alerta = new Alerta(error.error.respuesta, "danger");
          }
      });
    }

    public getProductosVendedor(){
      if( this.token.getEmail()!=""){
        this.productoServicio.getProductosVendedor(this.token.getEmail()).subscribe({
          next: data => {
            this.sharedService.updateObjeto(this.objeto);
            this.productos = data.respuesta;
            },
            error: error => {
              this.objeto.alerta = new Alerta(error.error.respuesta, "danger");
            }
        });
      }else{
        this.route.navigate(["/"]);
      }
    }
}