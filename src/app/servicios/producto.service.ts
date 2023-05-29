import { Injectable } from '@angular/core';
import { ProductoGetDTO } from '../modelo/ProductoGetDTO';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { SharedService } from './shared.service';
import { ProductoDTO } from '../modelo/ProductoDTO';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private apiUrl = "http://localhost:8083/api/producto";

  constructor( private http:HttpClient) {   
  }

  getProductos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/listarProductos`);
  }

  public agregarProducto(producto: ProductoDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.apiUrl}/crear`, producto );
  }

  public eliminarProducto(codigoProducto: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiUrl}/eliminar/${codigoProducto}`);
  }

  public obtenerProducto(codigoProducto: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/obtener/${codigoProducto}`);
  }
  
  public categorias():Observable<any> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/categorias`);
  }
  public mediopago():Observable<any> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/mediopago`);
  }


  public listarProductosNombre(cadena: String): Observable<MensajeDTO>{
    console.log(cadena);
    return this.http.get<MensajeDTO>(`${this.apiUrl}/listarProductosNombre/${cadena}`);
  }

  getProductosVendedor(codigoUsuario: String): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/misproductos/${codigoUsuario}`);
  }

  getProductosMod(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/listarMod`);
  }

  cambiarEstado(codigoProducto: number):Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.apiUrl}/estado/${codigoProducto}`);


  }
  public editarProducto(codigoProducto: number, producto: ProductoDTO): Observable<MensajeDTO>{
    return this.http.put<MensajeDTO>(`${this.apiUrl}/actualizar/${codigoProducto}`, producto );
  }
}


