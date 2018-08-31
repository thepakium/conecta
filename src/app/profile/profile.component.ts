import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, Username } from 'src/app/share/models';
import { BusquedaService } from 'src/app/share/busqueda.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';


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
  compras = [] as Compra[];
  private modalGestionRef: NgbModalRef;
  private modal: NgbActiveModal;
  public cuota$: Observable<Number>;

  constructor(  private router: Router,
                private busquedaService: BusquedaService,
                private modalService: NgbModal) { }

  ngOnInit() {
    this.logged = JSON.parse(localStorage.getItem('user'));
    this.buscarprofile();
    this.buscarCompras();
    this.buscarCuota();
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

  buscarFirmas() {
    const datos = { tipo: 'firmas', usuario: this.logged };
    this.busquedaService.obtenerDatos(JSON.stringify(datos),
      data => {
      this.cantidades = data;
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
      }
    );
  }

  buscarCuota() {
    const datos = { tipo: 'cuota', usuario: this.logged };
    this.cuota$ = this.busquedaService.obtenerCuota(JSON.stringify(datos));

  }

  buscarCompras() {
    const datos = { tipo: 'ultimasCompras', usuario: this.logged };
    this.busquedaService.obtenerDatos(JSON.stringify(datos),
      data => {
      this.compras = data;
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
      }
    );
  }

}

interface Dato {
  estado: string;
  valor: string;

}

interface Compra {
  cantidad: number;
  cuando: Date;
}

interface Clave {
  antigua: string;
  nueva: string;
  repite: string;
}
