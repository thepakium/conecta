import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { BusquedaService } from '../share/busqueda.service';

@Component({
  selector: 'app-msjdir',
  templateUrl: './msjdir.component.html',
  styleUrls: ['./msjdir.component.css']
  , providers: [BusquedaService]
})
export class MsjdirComponent implements OnInit {

  usuarios: Usuario[];
  usuario: Usuario;
  categoria: any;
  mensaje = '';
  datos: any;
  filtros: Filtro[];
  selected: Usuario[] = [];
  timeout: any;

  categorias = [];

  constructor(    private toastr: ToastrService,
                  private busquedaService: BusquedaService  ) {
                  this.buscarCategoria( );
                  this.buscarUsuario();
                  this.buscarFiltros();
                 }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('user'));

    this.toastr.show(
      '¡Trabajemos por reforzar los Vínculos y reconstruir la confianza entre las personas!' +
      ' Con Conectados estás a un mensaje de distancia.' ,
      'Bienvenid' + (this.usuario.genero === 'Mujer' ? 'a ' : 'o ')  + this.usuario.nombre, { timeOut: 6000 });
}

  enviarMensaje( ) {
    const datos = { mensaje: this.mensaje , usuario: this.usuario, categoria: this.categoria, quienes: this.selected };

       this.busquedaService.enviarMsj( JSON.stringify(datos) ).subscribe( respuesta => {
         if (respuesta && !respuesta.errors) {
           this.toastr.success( respuesta, 'Mensaje Enviado', {
               timeOut: 3000,
           });
            this.selected = null;
            this.mensaje = null;
       } else {
           this.toastr.error('Mensajes no fueron enviados', 'ERROR', {
               timeOut: 3000,
           });
       }
     } );
  }

  customSearchFn(term: string, item: Usuario) {
    term = term.toLocaleLowerCase();
    return item.nombre.toLocaleLowerCase().indexOf(term) > -1 || item.apellido.toLocaleLowerCase().indexOf(term) > -1;
  }

  buscarCategoria() {
    const datos = { tipo: 'categoria', usuario: this.usuario };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => this.categorias = data );
  }

  buscarFiltros() {
    const datos = { tipo: 'filtroUsuario', usuario: this.usuario };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => this.filtros = data );
  }

  buscarUsuario() {
    const datos = { tipo: 'usuario', usuario: this.usuario };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => this.usuarios = data );
  }


  filtrar(event) {
    this.selected.splice(0, this.selected.length);
    this.usuarios.forEach( quien => {
      switch (event.tipo) {
        case 'organizacion':
          if ( quien.organizacion === event.nombre ) {
            this.selected.push( quien );
          }
          break;
        case 'barrio':
          if ( quien.barrio === event.nombre ) {
            this.selected.push( quien );
          }
          break;
        case 'sexo':
          if ( quien.genero === event.nombre ) {
            this.selected.push ( quien );
          }
          break;
      }
    } );
  }

  onSelect({ selected }) {

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  remove() {
    this.selected = [];
  }

}

// just an interface for type safety.
interface Usuario {
  organizacion: string;
  nombre: string;
  apellido: string;
  telefono: number;
  genero: string;
  barrio: string;
}

interface Filtro {
  tipo: string;
  nombre: string;
  etiqueta: string;
}






