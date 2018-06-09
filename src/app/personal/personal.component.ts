import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/share/models';
import { BusquedaService } from 'src/app/share/busqueda.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  usuarios: Usuario[];
  usuario: Usuario;
  loadingIndicator = true;

  constructor(  private busquedaService: BusquedaService  ) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.buscarUsuario();

  }

  buscarUsuario() {
    const datos = { tipo: 'usuario', usuario: this.usuario };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) ,
                data => { this.usuarios = data;
                          setTimeout(() => { this.loadingIndicator = false; }, 1500); 
                        }
    );
  }
}
