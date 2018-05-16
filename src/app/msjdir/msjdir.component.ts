import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../share/busqueda.service';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({
  selector: 'app-msjdir',
  templateUrl: './msjdir.component.html',
  styleUrls: ['./msjdir.component.css']
})
export class MsjdirComponent implements OnInit {

  usuarios: Usuario[];
  seleccionados: any;
  mensaje: string;
  datos: any;

  constructor( private busquedaService: BusquedaService ) { }

  ngOnInit() {
    this.buscarUsuarios();
  }

  private buscarUsuarios() {
    this.busquedaService.listadoUsuarios().subscribe( respuesta => this.usuarios = respuesta.data );
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
