import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngresoData } from 'src/app/share/models';
import { ToastrService } from 'ngx-toastr';
import { BusquedaService } from '../share/busqueda.service';

@Component({
  selector: 'app-root',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
  , providers: [BusquedaService]
})
export class LoginformComponent implements OnInit {
  constructor(private toastr: ToastrService,
              private busquedaService: BusquedaService,
              private router: Router) { }

  ingreso: IngresoData = new IngresoData();

  ngOnInit() {
  }

  buscarCategoria() {
  }

  loginUser() {
    const datos = { tipo: 'auth' , user: this.ingreso };

    this.busquedaService.obtenerDatos( JSON.stringify(datos) , respuesta => {
        if ( respuesta && !respuesta.errors && Object.keys(respuesta).length > 0) {
            localStorage.setItem('conecta2In', 'true');
            this.toastr.success(
                'Con Conectados estás a un mensaje de distancia.' , 'Acceso concedido', { timeOut: 3000 });
            localStorage.setItem('user', JSON.stringify(respuesta[0]));
            this.router.navigate(['/mensajes']);
        } else {
            console.log( ' USUARIO SIN ACCESO ');
            this.toastr.error('revise sus credenciales', 'Acceso no concedido', {
                timeOut: 3000,
            });
        }
    } );

  }
}
