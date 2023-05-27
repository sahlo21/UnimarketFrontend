import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { CrearProductoComponent } from './pagina/crear-producto/crear-producto.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { GestionProductosComponent } from './pagina/gestion-productos/gestion-productos.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';
import { LoginGuard } from './guards/permiso.service';

const routes: Routes = [
    { path: "", component: InicioComponent},
    { path: "login", component: LoginComponent},
    { path: "registro", component: RegistroComponent},
    { path: "crear-producto", component: CrearProductoComponent},
    { path: "busqueda/:texto", component: BusquedaComponent},
    { path: "gestion-productos", component: GestionProductosComponent },
    { path: "editar-producto/:codigo", component: CrearProductoComponent },
    { path: "carrito", component: CarritoComponent },
    { path: "editar-producto/:codigo", component: CrearProductoComponent},
    { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
    { path: "registro", component: RegistroComponent, canActivate: [LoginGuard] },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }