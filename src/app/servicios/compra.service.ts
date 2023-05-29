import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { CompraDTO } from '../modelo/compraDTO';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private catURL = "unimarket-production-bfc8.up.railway.app/api/compra";
  constructor(private http: HttpClient) { }

  public compra(compra: CompraDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.catURL}/crear`, compra);
  }
}