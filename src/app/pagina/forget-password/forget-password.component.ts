import { Component } from '@angular/core';

import {ForgetPasswordDTO} from "../../modelo/forget-password-dto";
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Alerta } from 'src/app/modelo/alerta';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  alerta!: Alerta;
  forgetPassword:ForgetPasswordDTO;
  constructor(private usuarioService: UsuarioService) {
    this.forgetPassword = new ForgetPasswordDTO();
  }

  public forgetPasswordFunction(){
    console.log(this.forgetPassword);
    const objeto = this;
    this.usuarioService.recuperarContrasena(this.forgetPassword.email).subscribe({
      next: data => {
        objeto.alerta = new Alerta(data.respuesta, "success");
      },
      error: error => {
        objeto.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
  }

}
