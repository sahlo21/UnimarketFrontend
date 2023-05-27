import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Alerta } from 'src/app/modelo/alerta';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  alerta!: Alerta;
  archivos!: FileList;
  categorias: string[];
  producto: ProductoDTO;
  esEdicion: boolean;
  codigoProducto: number;
  txtBoton: string = "Crear Producto";

  constructor(private imagenService: ImagenService, private categoriaService: CategoriaService,
    
    private productoService: ProductoService, private route: ActivatedRoute, private router: Router) {
    this.producto = new ProductoDTO();
    this.codigoProducto = 0;
    this.categorias = [];
    this.esEdicion = false;

    this.route.params.subscribe(params => {
      this.codigoProducto = params["codigo"];
      this.productoService.obtenerProducto(this.codigoProducto).subscribe({
        next: data => {
          const objetoProducto = data.respuesta;
          if (objetoProducto != null) {
            this.producto = objetoProducto;
            this.txtBoton = 'Editar Producto';
          }

        }
      });
    });
    this.productoService.categorias().subscribe(
      respuesta => {
        this.categorias = respuesta;
      },
      error => {
        console.error(error);
      }
    );
  }
  

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
    }
  }

  public crearProducto() {
    console.log(this.producto);
    const objeto = this;
    if (this.archivos != null && this.archivos.length > 0) {
        this.productoService.agregarProducto(this.producto).subscribe({
          next: data => {
            objeto.alerta = new Alerta(data.respuesta, "success");
          },
          error: error => {
            objeto.alerta = new Alerta(error.error.respuesta, "danger");
        }
      });
      this.router.navigate(["/gestion-productos"]);
      console.log(this.producto);
    } else {
      objeto.mensajeAlerta = 'Debe seleccionar al menos una imagen';
    }
  }

  public mensajeAlerta: string="";

  private cargarCategorias() {
    this.productoService.categorias().subscribe({
      next: data => {
        this.categorias = data.respuesta;
        console.log(data);
      },
      error: error => {
        console.log(error.error);
      }
    });
  }

  public subirImagenes() {
    if (this.archivos != null && this.archivos.length > 0) {
      const objeto = this.producto;
      const formData = new FormData();
      formData.append('multipartFile', this.archivos[0]);

      this.imagenService.subir(formData).subscribe({
        next: data => {
          console.log("imagen subida")
          objeto.imagen.push(data.respuesta.url);
        },
        error: error => {
          console.log(error.error);
        }
      });
    } else {
      console.log('Debe seleccionar al menos una imagen y subirla');
    }
  }

}
