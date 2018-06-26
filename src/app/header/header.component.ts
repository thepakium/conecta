import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../share/busqueda.service';
import { Router } from '@angular/router';
import { Usuario, Username } from 'src/app/share/models';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbTooltipConfig]
})



export class HeaderComponent implements OnInit {
  sugerencias = 'escriba aqui su comentario';
  estado = 'btn btn-primary float-top-s';
  logged: Username;
  constructor(private router: Router,config: NgbTooltipConfig) { 
    config.placement = 'bottom';
  }

  ngOnInit() {
    this.logged = JSON.parse(localStorage.getItem('user'));
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
