import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { SesionDTO } from '../modelo/sesion-dto';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authURL = "unimarket-production-bfc8.up.railway.app/api/auth";
  constructor(private http: HttpClient) { }

  public registrar(usuario:UsuarioDTO):Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/registro`, usuario);
  }

  public login(sesion:SesionDTO):Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, sesion);
  }

  public obtenerUsuarioLogueado(): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.authURL}/auth/usuario`);
  }
}
