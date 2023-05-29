import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { SharedService } from './shared.service';
import { PasswordDTO } from '../modelo/password-dto';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private userUrl = "http://localhost:8083/api/usuario";

  constructor(private http: HttpClient,private shared: SharedService ) { 
    
  }

  public obtener(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/obtener/${codigo}`);
  }

  public eliminar(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userUrl}/${codigo}`);
  }

  public actualizar(codigo: number, usuario: UsuarioDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.userUrl}/${codigo}`, usuario);
  }

  public ciudades():Observable<any> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/ciudades`);
  }

  public cedula(correo:String):Observable<number>{
    return this.http.get<number>(`${this.userUrl}/cedula/${correo}`);
  }
  public cambiarConstrasenaAnterior( codigo:number, passwordDTO: PasswordDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.userUrl}/${codigo}`, passwordDTO);
  }

  public cambiarConstrasenaRecuperada( emailPerson:string, passwordDTO: PasswordDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.userUrl}/cambiarContrasenaRecuperada/${emailPerson}`, passwordDTO);
  }
  public recuperarContrasena(email:string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/recuperarContrasena`, email);
  }

  
}
