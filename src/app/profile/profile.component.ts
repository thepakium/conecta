import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, Username } from 'src/app/share/models';
import { BusquedaService } from 'src/app/share/busqueda.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  logged: Username;
  loadingIndicator = true;
  cantidades: Dato[];
  constructor(private router: Router, private busquedaService: BusquedaService) { }

  ngOnInit() {
    this.logged = JSON.parse(localStorage.getItem('user'));
    this.buscarprofile();
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
