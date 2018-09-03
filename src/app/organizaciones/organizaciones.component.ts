import { Component, OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BusquedaService } from 'src/app/share/busqueda.service';
import { Username, Victima, Organizacion } from '../share/models';

@Component({
  selector: 'app-organizaciones',
  templateUrl: './organizaciones.component.html',
  styleUrls: ['./organizaciones.component.css']
})
export class OrganizacionesComponent implements OnInit {

  @ViewChild('myTable') table: any;
  logged: Username;
  organizaciones = [];
  grupos = [];
  modifica = false;
  victima = new Victima;
  newOrg = new Organizacion;
  loadingIndicator = true;
  private modalBorraRef: NgbModalRef;
  private modalGestionRef: NgbModalRef;


  constructor(  private busquedaService: BusquedaService,
                private toastr: ToastrService,
                private modalService: NgbModal ) { }

  ngOnInit() {
    this.logged = JSON.parse(localStorage.getItem('user'));
    this.buscarOrganizaciones();
  }

  gestiona(content, quien = null) {
    if (quien) {
      this.modifica = true;
      this.newOrg = new Organizacion;
      this.newOrg.id = quien.id;
      this.newOrg.organizacion = quien.nombre;
      this.newOrg.contrato = quien.contrato;

    } else {
      this.modifica = false;
      this.newOrg = new Organizacion;
    }

    this.modalGestionRef = this.modalService.open(content, { size: 'lg' });
  }

  buscarOrganizaciones() {
    const datos = { tipo: 'organizacion', usuario: this.logged };
    this.busquedaService.obtenerDatos( JSON.stringify(datos), data => { this.organizaciones = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);     }
    );
  }

  buscaGrupo(organizacion) {
    if (organizacion) {
      const datos = { tipo: 'grupo', usuario: this.logged, organizacion: organizacion };
      this.busquedaService.obtenerDatos(JSON.stringify(datos), data => this.grupos = data);
    } else {
      this.grupos = [];
    }
  }

  borrar(quien, modal) {
    this.victima.id = quien.id;
    this.victima.quien = quien.nombre;
    this.modalBorraRef = this.modalService.open(modal, { size: 'lg' });
  }

  elimina() {
    this.victima.tipo = 'organizacion';
    const datos = { tipo: 'elimina', usuario: this.logged, 'victima': this.victima };
    this.busquedaService.ingresaDatos(JSON.stringify(datos), data => {
      if (data) {
        this.toastr.success(this.victima.quien + ' ' + data, null, {
          timeOut: 3000,
        });
        this.modalBorraRef.close();
        this.victima = new Victima;
      }
    }
    );
    this.buscarOrganizaciones();
  }

  ingresaOrg() {
    const datos = { tipo: this.modifica ? 'cambia' : 'registra', usuario: this.logged, cliente: this.newOrg, modelo: 'o' };
    this.busquedaService.ingresaDatos(JSON.stringify(datos), data => {
      if (data && data.substring(0, 5) !== 'Error') {
        this.toastr.success(this.newOrg.organizacion + ' ' + data, null, {
          timeOut: 3000,
        });
        this.newOrg = new Organizacion;
      } else {
        this.toastr.error(data + ' Organización ' + this.newOrg.organizacion, null, {
          timeOut: 3000,
        });
      }
    }
    );
    this.modalGestionRef.close();
    this.buscarOrganizaciones();
  }

}
