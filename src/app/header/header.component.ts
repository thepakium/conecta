import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../share/busqueda.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  sugerencias = 'escriba aqui su comentario';

  constructor(private router: Router) { }

  estado = 'btn btn-primary float-top-s';

  ngOnInit() {
    this.retirarboton();
  }

 moverin(): void {
   this.estado = 'btn btn-primary float-top-s';
 }
 moverout(): void {
   this.estado = 'btn btn-primary float-top-h';
 }

 retirarboton(): void {
    setTimeout(() => { this.moverout(); }, 1000);
 }

 logout() {
   localStorage.removeItem('conecta2In');
   localStorage.removeItem('user');
   this.router.navigate(['/login']);
 }

 send() {}

}
