import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, Username } from 'src/app/share/models';
import { BusquedaService } from 'src/app/share/busqueda.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  logged: Username;
  loadingIndicator = true;
  cantidades: Dato[];
  cambio = {} as Clave;
  private modalGestionRef: NgbModalRef;
  private modal: NgbActiveModal;

  constructor(  private router: Router,
                private busquedaService: BusquedaService,
                private modalService: NgbModal) { }

  ngOnInit() {
    this.logged = JSON.parse(localStorage.getItem('user'));
    this.buscarprofile();
  }

  muestraModal( content ) {
    this.modalGestionRef = this.modalService.open( content, {  });

  }

  cerrar() {
    const d = this.modal.close;
  }

  buscarprofile() {
    const datos = { tipo: 'sumarioPerfil', usuario: this.logged };
    this.busquedaService.obtenerDatos( JSON.stringify(datos) ,
                data => { this.cantidades = data;
                          setTimeout(() => { this.loadingIndicator = false; }, 1500);
                        }
    );
  }

}

interface Dato {
  estado: string;
  valor: string;

}

interface Clave {
  antigua: string;
  nueva: string;
  repite: string;
}
