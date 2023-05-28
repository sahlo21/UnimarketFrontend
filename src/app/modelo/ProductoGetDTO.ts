export class ProductoGetDTO {
    codigo: number = 0;
    nombre: string = "";
    descripcion: string = "";
    precio: number = 0.0;
    unidades: number = 0;
    imagenes: string[] = [];
    categorias: string[] = [];
    codigoVendedor: number = 0;
    

    constructor(codigo: number, nombre: string, descripcion: string, precio: number, unidades: number, imagenes: string[], categorias: string[], codigoVendedor: number){
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio =precio;
        this.unidades = unidades;
        this.imagenes = imagenes;
        this.categorias = categorias;
        this.codigoVendedor = codigoVendedor;

    }
}