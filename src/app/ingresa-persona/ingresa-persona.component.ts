import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../share/busqueda.service';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ingresa-persona',
  templateUrl: './ingresa-persona.component.html',
  styleUrls: ['./ingresa-persona.component.css']
})
export class IngresaPersonaComponent implements OnInit {
  generos=["Hombre", "Mujer"]
  usuarios: Usuario[];
  seleccionados: any;
  seleccionadosb: any;
  organizacion: "";
  organizaciones=[];
  organizaciones2=[];
  barrios: Barrio[];
  nombre="Ingrese nombre..";
  apellido="Ingrese Apellidos";
  telefono="56912345678";
  genero="";
  mail="";
  fecha_nacimiento="";
  constructor(private busquedaService: BusquedaService,) { }

  ngOnInit()     { this.buscarUsuarios(); }
  private buscarUsuarios() {
    this.busquedaService.listadoUsuarios().subscribe( respuesta => {
      respuesta.data.forEach(element => {
        this.organizaciones.push(element.organizacion);
        
        });
        this.organizaciones2 = Array.from( new Set( this.organizaciones));
        console.log(this.organizaciones2);
    } );
  }   
  crear_Persona( nombre: string , apellido: string , telefono: string , genero :string, mail :string, fecha_nacimiento :string) {
      this.busquedaService.crearPersona(nombre,apellido,telefono,genero,mail,fecha_nacimiento).subscribe( respuesta => {
      console.log("enviando a php : ",respuesta); } 
    )
  };
  buscaBarrio(organizacion: string) {
      console.log("entro a BuscaBarrio con valor : ",organizacion)
      this.busquedaService.listadoBarrios(organizacion).subscribe( respuesta => {
      console.log("enviando a buscabarrio : ",respuesta); 
      respuesta.data.forEach(element => {
        this.barrios.push(element.nombre);
        
        });
    } 
    )
  };
  update () {
      console.log("ahora tiene : ",this.organizaciones);
  }
    
    
  
}

interface Barrio {
  nombre: string;
}
interface Usuario {
  organizacion: string;
  nombre: string;
  apellido: string;
  telefono: number;
  genero: string;
}
