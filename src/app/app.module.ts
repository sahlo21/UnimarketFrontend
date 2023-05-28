import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CrearProductoComponent } from './pagina/crear-producto/crear-producto.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { GestionProductosComponent } from './pagina/gestion-productos/gestion-productos.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { SharedService } from './servicios/shared.service';
import { ListarTodosProductosComponent } from './pagina/listar-todos-productos/listar-todos-productos.component';
import { DetallePComponent } from './pagina/detalle-p/detalle-p.component';
import { CompraComponent } from './pagina/compra/compra.component';
import { ForgetPasswordComponent } from './pagina/forget-password/forget-password.component';
import { RestorePasswordComponent } from './pagina/restore-password/restore-password.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    CrearProductoComponent,
    BusquedaComponent,
    GestionProductosComponent,
    CarritoComponent,
    AlertaComponent,
    ListarTodosProductosComponent,
    DetallePComponent,
    CompraComponent,
    ForgetPasswordComponent,
    RestorePasswordComponent
  ],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, FormsModule, RouterModule],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
