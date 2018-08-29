import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Usuario, Username, Victima } from 'src/app/share/models';
import { ToastrService } from 'ngx-toastr';
import { BusquedaService } from 'src/app/share/busqueda.service';
import {NgbModal, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  usuarios: Usuario[];
  registerForm: FormGroup;
  myGroup: FormGroup;
  usuario: Usuario;
  logged: Username;
  agrupaciones = [];
  organizaciones = [];
  organizacion: number;
  generos = ['Masculino', 'Femenino','Otro'];
  grupos = [];
  newUser = new Usuario;
  loadingIndicator = true;
  victima = new Victima;
  private modalGestionRef: NgbModalRef;
  private modalBorraRef: NgbModalRef;
  private modalIngresaRef: NgbModalRef;
  modifica = false;
  ref: any;
  grupo: any;

  constructor(  private busquedaService: BusquedaService ,
                private toastr: ToastrService,
                private formBuilder: FormBuilder,
                private modalService: NgbModal ) { }

  ngOnInit() {
    this.logged = JSON.parse(localStorage.getItem('user'));
    this.buscarGrupoUsuarios();
    this.buscarOrganizaciones();
      this.myGroup = new FormGroup({
            telefono: new FormControl('', Validators.compose([
                                            Validators.maxLength(10),
                                            Validators.minLength(9),
                                            Validators.required
                                        ])
                                    ),
        });
  this.registerForm = this.formBuilder.group({
            telefono: new FormControl('', Validators.compose([
                                            Validators.maxLength(10),
                                            Validators.minLength(9),
                                            Validators.required
                                          ])
                                      ),
              });

  }

  buscarGrupoUsuarios() {
    const datos = { tipo: 'sumarioGrupo', usuario: this.logged };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) ,
                data => { this.agrupaciones = data;
                          setTimeout(() => { this.loadingIndicator = false; }, 1500);
                        }
    );
  }

  buscarUsuarios( grupo ) {
    this.usuarios = [];
    const datos = { tipo: 'usuario', usuario: this.logged, grupo: grupo };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) ,
                data => { this.usuarios = data;
                          setTimeout(() => { this.loadingIndicator = false; }, 1500);
                        }
    );
  }

  ingresaUsuario() {
    const datos = { tipo: this.modifica ? 'actualiza' : 'registra', usuario: this.logged, cliente: this.newUser , modelo: 'c' };
    this.busquedaService.ingresaDatos( JSON.stringify(datos) , data => {
        if (data ) {
            this.toastr.success( this.newUser.nombre + ' ' + data , null, {
                timeOut: 3000,
            });
            this.newUser = new Usuario;
          }
        }
      );
      this.modalIngresaRef.close();
      this.gestiona();
  }

  elimina() {
    const datos = { tipo: 'elimina', usuario: this.logged, 'victima': this.victima };
    this.busquedaService.ingresaDatos( JSON.stringify(datos) , data => {
            if (data ) {
                this.toastr.success( this.victima.tipo + ' ' + this.victima.quien + ' ' + data , null, {
                    timeOut: 3000,
                });
                this.modalBorraRef.close();
                this.victima = new Victima;
            }
          }
       );
    if ( this.victima.tipo === 'cliente' ) {
          this.gestiona();
     } else {
      this.buscarGrupoUsuarios();
    }
  }

  borrar( id , nombre , tipo , modal ) {
    this.victima.id = id;
    this.victima.quien = nombre;
    this.victima.tipo = tipo;
    if ( this.victima.tipo === 'cliente' ) { this.modalGestionRef.close(); }
    this.modalBorraRef = this.modalService.open( modal , { size: 'lg' });
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
      this.newUser.id_grupo = null;
    }
  }

  gestiona(content = null, grupo = null ) {
    if (grupo) { this.grupo = grupo; }
    if ( content ) { this.ref = content; }
    this.buscarUsuarios(this.grupo );
    this.modalGestionRef = this.modalService.open( this.ref, { size: 'lg' });
  }

  cancela() {
    this.modalBorraRef.close();
    if ( this.victima.tipo === 'cliente' ) {  this.gestiona(); }
  }

  cancelo() {
    this.modalIngresaRef.close();
    this.gestiona();
  }

  accion ( modal, dato = null ) {
    this.modalGestionRef.close();
    this.modalIngresaRef = this.modalService.open( modal, { size: 'lg' });
    if ( dato ) {
      this.newUser = dato;
      this.organizacion = dato.id_organizacion;
      this.buscaGrupo( this.organizacion );
      this.modifica = true;
    } else {
      this.newUser = new Usuario;
      this.organizacion = null;
      this.modifica = false;
    }
  }

}


