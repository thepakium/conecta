import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngresoData } from 'src/app/share/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  constructor(private toastr: ToastrService,
              private router: Router) { }

  ingreso: IngresoData = new IngresoData();

  ngOnInit() {
  }


  loginUser() {

    if ( this.ingreso.usuario === 'demo' && this.ingreso.pass === 'demo') {
        this.toastr.success('', 'Acceso concedido', {
          timeOut: 500,
        });
        localStorage.setItem('conecta2In', 'true');
        this.router.navigate(['msjdir']);
      } else {
        this.toastr.error('datos no fueron validados', 'Ingreso no válido', {
                     timeOut: 3000,
                 });
      }
  }
}
