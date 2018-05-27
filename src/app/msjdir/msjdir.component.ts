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
  seleccionados: any;
  categoria: any;
  mensaje = '';
  datos: any;

  rows = [];
  selected: Usuario[] = [];
  timeout: any;

  categorias = [];

  constructor(    private toastr: ToastrService,
                  private busquedaService: BusquedaService  ) {
                  this.buscarCategoria( );
                  this.buscarUsuario();

                 }

  ngOnInit() {
  this.usuario = JSON.parse(localStorage.getItem('user'));
  console.log( this.usuario);
}

  enviarMensaje( ) {

    console.log( this.selected[1].telefono );
    //   this.busquedaService.enviarMsj( numero, mensaje ).subscribe( respuesta => {
    //     if (respuesta && !respuesta.errors) {
    //       this.toastr.success( respuesta, 'Mensaje Enviado', {
    //           timeOut: 3000,
    //       });
    //        this.seleccionados = null;
    //        this.mensaje = null;
    //   } else {
    //       console.log( respuesta );
    //       this.toastr.error('Mensajes no fueron enviados', 'ERROR', {
    //           timeOut: 3000,
    //       });
    //   }

    // } );
  }

  customSearchFn(term: string, item: Usuario) {
    term = term.toLocaleLowerCase();
    return item.nombre.toLocaleLowerCase().indexOf(term) > -1 || item.apellido.toLocaleLowerCase().indexOf(term) > -1;
  }

  buscarCategoria() {
    const datos = { tipo: 'categoria'};
    this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => this.categorias = data );
  }

  buscarUsuario() {
    const datos = { tipo: 'usuario'};
    this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => this.usuarios = data );
  }

  onSelect({ selected }) {
    // console.log('Select Event', selected, this.selected);

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
  sexo: string;
}
