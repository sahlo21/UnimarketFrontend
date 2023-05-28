import { ProductoGetDTO } from "./ProductoGetDTO";

export class DetalleCompraDTO{
    producto: ProductoGetDTO;
    unidades: number = 0;


    constructor(producto: ProductoGetDTO, unidades: number){
        this.producto = producto;
        this.unidades = unidades;
    }
}