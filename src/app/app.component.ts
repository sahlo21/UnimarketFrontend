import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SharedService } from './servicios/shared.service';
import { TokenService } from './servicios/token.service';
import { SesionService } from './servicios/sesion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

  title = 'Unimarket';
  isLogged = false;
  email: string = "";
  mostrarProductos: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private sharedService: SharedService,
    private tokenService: TokenService, private sesionService: SesionService) { }

  ngOnInit(): void {
    // this.isLogged = this.tokenService.isLogged();
    // if(this.isLogged){
    // this.email = this.tokenService.getEmail();
    // }
    const objeto = this;
    this.sesionService.currentMessage.subscribe({
      next: data => {
        objeto.actualizarSesion(data);
      }
    });
    this.actualizarSesion(this.tokenService.isLogged());
  }

  private actualizarSesion(estado: boolean) {
    this.isLogged = estado;
    if (estado) {
      this.email = this.tokenService.getEmail();
    } else {
      this.email = "";
    }
  }

  public iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(['/busqueda', valor]);
    }
  }

  public logout() {
    this.tokenService.logout();
  }

}
