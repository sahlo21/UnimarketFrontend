import { Component, NgModule } from '@angular/core';
import { ListarTodosProductosComponent } from './pagina/listar-todos-productos/listar-todos-productos.component';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { CrearProductoComponent } from './pagina/crear-producto/crear-producto.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { GestionProductosComponent } from './pagina/gestion-productos/gestion-productos.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';
import { DetallePComponent } from './pagina/detalle-p/detalle-p.component';
import { LoginGuard } from './guards/permiso.service';
import { CompraComponent } from './pagina/compra/compra.component';
import {RestorePasswordComponent} from "./pagina/restore-password/restore-password.component";
import {ForgetPasswordComponent} from "./pagina/forget-password/forget-password.component";


const routes: Routes = [
    { path: "", component: InicioComponent},
    { path: "login", component: LoginComponent},
    { path: "registro", component: RegistroComponent},
    { path: "crear-producto", component: CrearProductoComponent},
    { path: "recuperarContrasena", component: ForgetPasswordComponent },
    { path: "restore_password", component: RestorePasswordComponent },
    { path: "busqueda/:texto", component: BusquedaComponent},
    { path: "gestion-productos", component: GestionProductosComponent },
    { path: "editar-producto/:codigo", component: CrearProductoComponent },
    { path: "carrito", component: CarritoComponent },
    { path: "editar-producto/:codigo", component: CrearProductoComponent},
    { path: "listar-todos-productos", component: ListarTodosProductosComponent},
    { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
    { path: "detalle", component: DetallePComponent},
    { path: "registro", component: RegistroComponent, canActivate: [LoginGuard] },
    { path: "compra", component: CompraComponent},
    { path: "detalle-producto/:texto", component: DetallePComponent},
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
