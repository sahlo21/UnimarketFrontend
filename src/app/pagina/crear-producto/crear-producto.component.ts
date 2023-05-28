import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoDTO } from 'src/app/modelo/ProductoDTO';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Alerta } from 'src/app/modelo/alerta';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TokenService } from 'src/app/servicios/token.service';

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
  email:any;
  codigoUsuario:any;

  constructor(private imagenService: ImagenService, private categoriaService: CategoriaService,
    
    private productoService: ProductoService, private route: ActivatedRoute, private router: Router, private usuarioService: UsuarioService,private token: TokenService) {
    this.producto = new ProductoDTO();
    this.codigoProducto = 0;
    this.categorias = [];
    this.esEdicion = false;
    this.email=this.token.getEmail();

    this.route.params.subscribe(params => {
      this.codigoProducto = params["codigo"];
if(this.codigoProducto!= undefined){
  this.productoService.obtenerProducto(this.codigoProducto).subscribe({
    next: data => {
      const objetoProducto = data.respuesta;
      if (objetoProducto != null) {
        this.producto = objetoProducto;
        this.txtBoton = 'Editar Producto';
      }

    }
  });
}
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
    this.usuarioService.cedula(this.email).subscribe((valor: any) => {
      this.codigoUsuario = valor.respuesta;
      this.producto.codigoVendedor=this.codigoUsuario;
    });
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
      this.usuarioService.cedula(this.email).subscribe((valor: any) => {
        this.codigoUsuario = valor.respuesta;
      });
      this.producto.codigoVendedor = this.codigoUsuario;
        this.productoService.agregarProducto(this.producto).subscribe({
          next: data => {
            objeto.alerta = new Alerta(data.respuesta, "success");
          },
          error: error => {
            objeto.alerta = new Alerta(error.error.respuesta, "danger");
        }
      });
      this.router.navigate(["/gestion-productos"]);
    } else {
      objeto.mensajeAlerta = 'Debe seleccionar al menos una imagen';
    }
  }

  public mensajeAlerta: string="";

  private cargarCategorias() {
    this.productoService.categorias().subscribe({
      next: data => {
        this.categorias = data.respuesta;
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
          objeto.imagenes.push(data.respuesta.url);
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
