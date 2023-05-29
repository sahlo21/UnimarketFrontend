import { DetalleCompraDTOO } from "./detalle-compra-dtoo";

export class CompraDTO {
  codigoUsuario: number = 0;
  metodoPago: String = "";
  detalleCompraDTO: DetalleCompraDTOO[] = [];
  }