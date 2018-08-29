import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BusquedaService } from 'src/app/share/busqueda.service';
import { Username, Victima } from 'src/app/share/models';
import {NgbModal, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {


  @ViewChild('myTable') table: any;

  rows: any[] = [];
  expanded: any = {};
  newUser = new Username;
  logged: Username;
  usuarios: Username[] = [];
  loadingIndicator = true;
  generos = ['Masculino', 'Femenino','Otro'];
  perfiles = ['admin', 'user'];
  private modalGestionRef: NgbModalRef;
  private modalBorraRef: NgbModalRef;
  victima = new Victima;
  organizaciones = [];
  grupos = [];
  modifica = false;

  constructor(  private busquedaService: BusquedaService,
                private toastr: ToastrService,
                private modalService: NgbModal  ) { }

  ngOnInit() {
    this.logged = JSON.parse(localStorage.getItem('user'));
    this.buscarUsuarios();
    this.buscarOrganizaciones();
  }

  buscarUsuarios() {
    const datos = { tipo: 'usuarios', usuario: this.logged };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => { this.usuarios = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500); }
    );
  }

  buscarOrganizaciones() {
    const datos = { tipo: 'organizacion', usuario: this.logged };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => this.organizaciones = data );
  }

  buscaGrupo( organizacion ) {
    if ( organizacion ) {
      const datos = { tipo: 'grupo', usuario: this.logged , organizacion: organizacion };
      this.busquedaService.obtenerDatos(JSON.stringify(datos), data => this.grupos = data );
    } else {
      this.grupos = [];
    }
  }

  toggleExpandRow(row) {
    // console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  borrar( quien , modal ) {
    this.victima.id = quien.id;
    this.victima.quien = quien.usuario;
    this.modalBorraRef = this.modalService.open( modal , { size: 'lg' });
  }

  elimina() {
    this.victima.tipo = 'user';
    const datos = { tipo: 'elimina', usuario: this.logged, 'victima': this.victima };
    this.busquedaService.ingresaDatos( JSON.stringify(datos) , data => {
            if (data ) {
                this.toastr.success( this.victima.quien + ' ' + data , null, {
                    timeOut: 3000,
                });
                this.modalBorraRef.close();
                this.victima = new Victima;
            }
          }
       );
    this.buscarUsuarios();
  }

  gestiona(content , quien = null  ) {
    if( quien ) {
      this.modifica = true;
      this.newUser = new Username;
      this.newUser.id = quien.id;
      this.newUser.apellido = quien.apellido;
      this.newUser.nombre = quien.nombre;
      this.newUser.username = quien.username;
      this.newUser.genero = quien.genero;
      this.newUser.perfil = quien.perfil;
      this.newUser.mail = quien.mail;
      this.newUser.organizacion = quien.id_orgs;
      this.newUser.grupos = quien.id_grupos ? quien.id_grupos.split(',') : [];
      this.buscaGrupo( this.newUser.organizacion );
    } else {
      this.modifica = false;
    }

    this.modalGestionRef = this.modalService.open( content, { size: 'lg' });
  }

  ingresaUsuario() {
    if( this.newUser && this.newUser.perfil === 'admin' ) {
      this.newUser.organizacion = null;
      this.newUser.grupos = [];
    }
    const datos = { tipo: this.modifica ? 'modifica' : 'registra', usuario: this.logged, cliente: this.newUser , modelo: 'p' };
    this.busquedaService.ingresaDatos( JSON.stringify(datos) , data => {
        if (data && data.substring(0, 5) !== 'Error' ) {
            this.toastr.success( this.newUser.nombre + ' ' + data , null, {
                timeOut: 3000,
            });
            this.newUser = new Username;
          } else {
            this.toastr.error( data + ' Usuario ' + this.newUser.nombre , null, {
              timeOut: 3000,
          });
          }
        }
      );
      this.modalGestionRef.close();
      this.buscarUsuarios();
  }

}
