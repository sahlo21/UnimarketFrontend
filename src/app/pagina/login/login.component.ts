import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/servicios/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  alerta!: Alerta;
  usuario: UsuarioDTO;
  email: string = "";

  constructor(private authService: AuthService, private tokenService: TokenService, 
    private componet:AppComponent, private sharedService: SharedService, private router: Router) {
    this.usuario = new UsuarioDTO();
  }

  public login(){
    const objeto = this;
    this.authService.login(this.usuario).subscribe({
    next: data => {
    objeto.sharedService.setUsuario(this.usuario);
    objeto.tokenService.login(data.respuesta.token);
    if(this.tokenService.getEmail()=="admin@gmail.com"){
      this.email="ADMINISTRADOR";
      this.router.navigate(['lista-usuarios']);
    }
    },
    error: error => {
    objeto.alerta = new Alerta(error.error.respuesta, "danger");
    }
    });
  }


}