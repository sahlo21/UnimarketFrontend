import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SharedService } from 'src/app/servicios/shared.service';

@Component({
  selector: 'app-detalle-p',
  templateUrl: './detalle-p.component.html',
  styleUrls: ['./detalle-p.component.css']
})

export class DetallePComponent implements OnInit{
  
alerta!:Alerta;
codigo:any;
producto: any={};
route:any;
numero:number=0;

  constructor(private productoServicio: ProductoService,private router: Router, private sharedData: SharedService){
    this.producto=this.producto;
  }

  ngOnInit(): void {
const url: string = window.location.href; 
const segments: string[] = url.split('/');

const index: number = segments.indexOf('detalle-producto');
if (index !== -1 && segments.length > index + 1) {
  this.numero = parseInt(segments[index + 1]); 
} else {
  console.log('No se encontró el número en la URL.');
}
 this.obtenerProducto();
  }
  public obtenerProducto(){
    this.productoServicio.obtenerProducto(this.numero).subscribe({
      next: data => {
        this.alerta = new Alerta(data.respuesta, "success");
        this.producto=data.respuesta;
        },
        error: error => {
          this.alerta = new Alerta(error.error.respuesta, "danger");
        }
    });
  }
}
