import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { BusquedaService } from '../share/busqueda.service';
import { Usuario, Formulario, Username } from 'src/app/share/models';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-msjdir',
  templateUrl: './msjdir.component.html',
  styleUrls: ['./msjdir.component.css']
  , providers: [BusquedaService]
})
export class MsjdirComponent implements OnInit {

  usuarios: Usuario[];
  newUsuarios: Usuario[];
  usuario: Usuario;
  logged: Username;
  categoria: any;
  mensaje = '';
  c2: any;
  cambio = '';
  datos: any;
  dest: any;
  fecha: Date;
  ocultaSubFiltro = true;
  filtros: Filtro[];
  subfiltros: Filtro[] = [{
                          tipo: 'all',
                          nombre: '',
                          etiqueta: 'Todos'
                        },
                        {
                          tipo: 'sexo',
                          nombre: 'Masculino',
                          etiqueta: 'Solo Hombres'
                        },
                        {
                          tipo: 'sexo',
                          nombre: 'Femenino',
                          etiqueta: 'Solo Mujeres'
                        }];
  subfiltro: Filtro = this.subfiltros[0];
  selected: Usuario[] = [];
  subselected: Usuario[] = [];
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
    const datos = { mensaje: this.limpiarCaracteres(this.mensaje) ,
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

  modificar(valor) {
    switch (valor) {
      case 'nombre':
        this.mensaje += '##(nombre)';
      break;
      case 'apellido':
        this.mensaje += '##(apelli)';
      break;
      case 'barrio':
        this.mensaje += '##(barrio)';
      break;
      case 'at':
        this.mensaje += '#@';
      break;
      case 'firma':
        this.mensaje += ' -Firma-';
      break;
      case 'borrar':
        this.mensaje = '';
      break;
    }
  }

  cambiarTexto(  ) {
    if ( !this.c2) { this.c2 = 0; }
    this.cambio = this.limpiarCaracteres(this.mensaje.replace(/\#\#\(nombre\)/ig, this.selected[this.c2].nombre.substring(0, 10) )
            .replace(/\#\#\(apelli\)/ig, this.selected[this.c2].apellidoP.substring(0, 10) )
            .replace('#@', (this.selected[this.c2].genero === 'Femenino') ? 'a' : 'o' )
            .replace(/\#\#\(barrio\)/ig, this.selected[this.c2].barrio.substring(0, 10) )
            .replace(/\-firma\-/ig, this.selected[this.c2].firma )
            .replace(/@\s/g, (this.selected[this.c2].genero === 'Femenino') ? 'a' : 'o' ));
  }

  limpiarCaracteres (texto) {
      return texto.replace(/[àáä]/g, 'a' )
                  .replace(/[ÀÁÄ]/g, 'A' )
                  .replace(/[àéë]/g, 'e' )
                  .replace(/[ÈÉË]/g, 'E' )
                  .replace(/[ìíï]/g, 'i' )
                  .replace(/[ÌÍÏ]/g, 'I' )
                  .replace(/[òóö]/g, 'o' )
                  .replace(/[ÒÓÖ]/g, 'O' )
                  .replace(/[ùúü]/g, 'u' )
                  .replace(/[ÙÚÜ]/g, 'U' )
                  .replace('ñ', 'n' )
                  .replace('Ñ', 'N' );
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
    this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => {
        this.usuarios = data;
        this.newUsuarios = data;
        setTimeout(() => { this.loadingIndicator = false; }, 1500); }
    );
  }

  filtrar(event) {
    this.selected.splice(0, this.selected.length);
    this.subselected.splice(0, this.subselected.length);
    this.subfiltro = this.subfiltros[0];
        switch (event.tipo) {
          case 'organizacion':
            this.ocultaSubFiltro = false;
            this.usuarios.forEach( quien => {
              if ( quien.organizacion === event.nombre ) {
              this.selected.push( quien );
              this.subselected.push( quien );
              }
            });
            break;
          case 'barrio':
            this.ocultaSubFiltro = false;
            this.usuarios.forEach( quien => {
              if ( quien.barrio === event.nombre ) {
              this.selected.push( quien );
              this.subselected.push( quien );
              }
            });
            break;
          case 'sexo':
            this.ocultaSubFiltro = true;
            this.usuarios.forEach( quien => {
              if ( quien.genero === event.nombre ) {
              this.selected.push ( quien );
              }
            });
            break;
      }
      this.newUsuarios = this.selected;
    }

    subfiltrar(event) {
      this.selected.splice(0, this.selected.length);
      switch (event.tipo) {
        case 'all':
        this.selected = this.subselected ;
        break;
        case 'sexo':
        this.subselected.forEach( quien => {
          if ( quien.genero === event.nombre ) {
            this.selected.push ( quien );
          }
        } );
        break;
      }
      this.newUsuarios = this.selected;
  }

  onSelect({ selected }) {

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    this.newUsuarios = this.selected;
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
