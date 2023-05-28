import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  
  constructor(private router: Router) {}

  ngOnInit(): void {
   // this.router.navigate(['/listar-todos-productos']); // Navegar automáticamente a la ruta "/listar-todos-productos"
   this.router.navigate(['/listar-todos-productos'], { skipLocationChange: true });

  }

}
