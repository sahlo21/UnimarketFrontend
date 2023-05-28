import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoGetDTO } from 'src/app/modelo/ProductoGetDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SharedService } from 'src/app/servicios/shared.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})


export class BusquedaComponent{
  textoBusqueda: string;
  productos: ProductoGetDTO[] = [];
  filtro: ProductoGetDTO[];
  objeto: any;

  constructor(private route: ActivatedRoute, private productoServicio: ProductoService, private sharedService: SharedService) {
    this.textoBusqueda = "";
    this.filtro = [];

    this.route.params.subscribe(params => {
      this.textoBusqueda = params["texto"];
      this.filtro = this.productos.filter(p =>
        p.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()));
        this.listarProductosnombre();
    });
  }

  public listarProductosnombre() {
    this.productoServicio.listarProductosNombre(this.textoBusqueda).subscribe({
      next: data =>{
        this.filtro = data.respuesta;
      }
    });
  }
}

