import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoServicioService{
  private catURL = "unimarket-production-bfc8.up.railway.app/api/producto";
  constructor(private http: HttpClient) { }
  public listar(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.catURL}/mediopago`);
  }
}