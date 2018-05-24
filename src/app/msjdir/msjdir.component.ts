import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../share/busqueda.service';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-msjdir',
  templateUrl: './msjdir.component.html',
  styleUrls: ['./msjdir.component.css']
})
export class MsjdirComponent implements OnInit {

  usuarios: Usuario[];
  seleccionados: any;
  categoria: any;
  mensaje = '';
  datos: any;

  categorias = ['Bienvenida a CONECTADOS',
  'Convocatoria Actividades Informativas',
  'Convocatoria Actividades Formativas',
  'Convocatoria Actividades Culturales',
  'Convocatoria Actividades Masivas',
  'Recordatorio Acuerdos y Actividades',
  'Cambios y/o Cancelación de Actividades',
  'Urgencias e Imprevistos',
  'Felicitaciones y Agradecimientos',
  'Difundir y Promocionar'];

  constructor(  private busquedaService: BusquedaService,
                private toastr: ToastrService ) { }

  ngOnInit() {
    this.buscarUsuarios();
  }

  private buscarUsuarios() {
    this.busquedaService.listadoUsuarios().subscribe( respuesta => this.usuarios = respuesta.data );
  }

  enviarMensaje(numero: string , mensaje: string ) {
      this.busquedaService.enviarMsj( numero, mensaje ).subscribe( respuesta => {
        if (respuesta && !respuesta.errors) {
          this.toastr.success( respuesta, 'Mensaje Enviado', {
              timeOut: 3000,
          });
           this.seleccionados = null;
           this.mensaje = null;
      } else {
          console.log( respuesta );
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

}

// just an interface for type safety.
interface Usuario {
  organizacion: string;
  nombre: string;
  apellido: string;
  telefono: number;
  sexo: string;
}
