import { Component, OnInit } from '@angular/core';
import { Usuario, Username } from 'src/app/share/models';
import { BusquedaService } from 'src/app/share/busqueda.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  usuarios: Usuario[];
  usuario: Usuario;
  logged: Username;
  organizaciones = [];
  organizacion = '';
  generos = ['Masculino', 'Femenino'];
  barrios = [];
  newUser = new Usuario;
  loadingIndicator = true;

  constructor(  private busquedaService: BusquedaService  ) { }

  ngOnInit() {
    this.logged = JSON.parse(localStorage.getItem('user'));
    this.buscarUsuarios();
    this.buscarOrganizaciones();

  }

  buscarUsuarios() {
    const datos = { tipo: 'usuario', usuario: this.logged };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) ,
                data => { this.usuarios = data;
                          setTimeout(() => { this.loadingIndicator = false; }, 1500);
                        }
    );
  }

  ingresaUsuario() {
    const datos = { tipo: 'registro', usuario: this.logged, cliente: this.newUser };
    this.busquedaService.ingresaDatos( JSON.stringify(datos) , data => console.log(data) );

  }

  buscarOrganizaciones() {
    const datos = { tipo: 'organizacion', usuario: this.logged };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => this.organizaciones = data );
  }

  buscaBarrio( organizacion ) {
    if ( organizacion ) {
      const datos = { tipo: 'barrio', usuario: this.logged , organizacion: organizacion };
      this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => this.barrios = data );
    } else {
      this.barrios = [];
      this.newUser.id_barrio = null;
    }
  }

}
