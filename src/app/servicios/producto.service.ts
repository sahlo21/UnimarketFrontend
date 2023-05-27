import { Injectable } from '@angular/core';
import { ProductoGetDTO } from '../modelo/producto-get-dto';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { ProductoDTO } from '../modelo/producto-dto';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private apiUrl = "http://localhost:8083/api/producto";

  constructor( private http:HttpClient) {   
  }

  getProductos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/listar`);
  }

  public agregarProducto(producto: ProductoDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.apiUrl}/crear`, producto );
  }

  public eliminarProducto(codigoProducto: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiUrl}/${codigoProducto}`);
  }

  public obtenerProducto(codigoProducto: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/${codigoProducto}`);
  }
  
  public categorias():Observable<any> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/categorias`);
  }
}