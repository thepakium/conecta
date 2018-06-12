import { Component, OnInit } from '@angular/core';
import { Usuario, Username, Victima } from 'src/app/share/models';
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
  agrupaciones = [];
  organizaciones = [];
  organizacion: number;
  generos = ['Masculino', 'Femenino'];
  barrios = [];
  newUser = new Usuario;
  loadingIndicator = true;
  victima = new Victima;

  constructor(  private busquedaService: BusquedaService  ) { }

  ngOnInit() {
    this.logged = JSON.parse(localStorage.getItem('user'));
    this.buscarGrupoUsuarios();
    this.buscarOrganizaciones();

  }

  buscarGrupoUsuarios() {
	const datos = { tipo: 'sumarioGrupo', usuario: this.logged };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) ,
                data => { this.agrupaciones = data;
                          setTimeout(() => { this.loadingIndicator = false; }, 1500);
                        }
    );
  }
  
  buscarUsuarios( barrio ) {
	this.usuarios = [];
    const datos = { tipo: 'usuario', usuario: this.logged , barrio: barrio };
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
  
  elimina() {
    const datos = { tipo: 'elimina', usuario: this.logged, 'victima': this.victima };
    this.busquedaService.ingresaDatos( JSON.stringify(datos) , data => console.log(data) );
	this.victima = new Victima;
  }
  
  borrar( id , nombre , tipo ) {
    this.victima.id = id;
	this.victima.quien = nombre;
	this.victima.tipo = tipo;
	//this.elimina( this.victima );
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

  accion ( dato = null ) {
    console.log( dato );
    if ( dato ) {
      this.newUser = dato;
    } else {
      this.newUser = new Usuario;
    }
  }

}


