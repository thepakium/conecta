import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { BusquedaService } from '../share/busqueda.service';
import { Usuario, Formulario, Username } from 'src/app/share/models';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-msjdir',
  templateUrl: './msjdir.component.html',
  styleUrls: ['./msjdir.component.css']
  , providers: [BusquedaService]
})
export class MsjdirComponent implements OnInit {

  usuarios: Usuario[];
  usuario: Usuario;
  logged: Username;
  categoria: any;
  mensaje = '';
  c2: any;
  cambio = '';
  datos: any;
  dest: any;
  fecha: Date;
  filtros: Filtro[];
  selected: Usuario[] = [];
  timeout: any;
  form = new Formulario();
  categorias = [];
  loadingIndicator = true;

  constructor(    private toastr: ToastrService,
                  private busquedaService: BusquedaService  ) {
                  }
 
  ngOnInit() {
          this.logged = JSON.parse(localStorage.getItem('user'));
          setTimeout(() => this.toastr.show('¡Trabajemos por reforzar los Vínculos y reconstruir la confianza entre las personas!' +
                                            ' Con Conectados estás a un mensaje de distancia.' ,
                                            'Bienvenid' + (this.logged.genero === 'Femenino' ? 'a ' : 'o ')  + this.logged.nombre));
          this.buscarCategoria( );
          this.buscarUsuario();
          this.buscarFiltros();
  }

  enviarMensaje( ) {
    const datos = { mensaje: this.mensaje ,
                    usuario: this.logged,
                    categoria: this.categoria,
                    quienes: this.selected,
                    programar: this.fecha
                  };

       this.busquedaService.enviarMsj( JSON.stringify(datos) ).subscribe( respuesta => {
         if (respuesta && !respuesta.errors) {
           this.toastr.success( respuesta.text(), 'Mensaje Enviado', {
               timeOut: 3000,
           });
            this.selected = [];
            this.categoria = null;
            this.mensaje = '';
       } else {
          console.log(respuesta);
           this.toastr.error('Mensajes no fueron enviados', 'ERROR', {
               timeOut: 3000,
           });
       }
     } );
  }

  cambiarTexto(  ) {
	  if( !this.c2) this.c2 = 0;
    this.cambio = this.mensaje.replace('##(nombre)', this.selected[this.c2].nombre )
						.replace('##(apelli)', this.selected[this.c2].apellidoP )
						.replace('#@', (this.selected[this.c2].genero === 'Femenino') ? 'a' : 'o' )
						.replace('##(barrio)', this.selected[this.c2].barrio );
    
  }

  // customSearchFn(term: string, item: Usuario) {
  //   term = term.toLocaleLowerCase();
  //   return item.nombre.toLocaleLowerCase().indexOf(term) > -1 || item.apellido.toLocaleLowerCase().indexOf(term) > -1;
  // }

  buscarCategoria() {
    const datos = { tipo: 'categoria', usuario: this.logged };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => this.categorias = data );
  }

  buscarFiltros() {
    const datos = { tipo: 'filtroUsuario', usuario: this.logged };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => this.filtros = data );
  }

  buscarUsuario() {
    const datos = { tipo: 'usuario', usuario: this.logged };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => { this.usuarios = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500); }
    );
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
interface Filtro {
  tipo: string;
  nombre: string;
  etiqueta: string;
}
