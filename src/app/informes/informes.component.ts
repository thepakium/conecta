import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BusquedaService } from '../share/busqueda.service';
import { Usuario, Username, Mensaje } from 'src/app/share/models';
import { environment } from '../../environments/environment';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css'],
  providers: [BusquedaService]
})

export class InformesComponent implements OnInit {
  datarecibida = [];
  mensajes = [];
  mensaje: Mensaje;
  logged: Username;
  loadingIndicator = true;
  mes: number;
  meses = [ {id: 1, name: 'Enero'},
            {id: 2, name: 'Febrero'},
            {id: 3, name: 'Marzo'},
            {id: 4, name: 'Abril'},
            {id: 5, name: 'Mayo'},
            {id: 6, name: 'Junio'},
            {id: 7, name: 'Julio'},
            {id: 8, name: 'Agosto'},
            {id: 9, name: 'Septiembre'},
            {id: 10, name: 'Octubre'},
            {id: 11, name: 'Noviembre'},
            {id: 12, name: 'Diciembre'}
          ];
  public pieChartColors = [
            {
              backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(0, 255, 0)',
                'rgba(102, 0, 204)',
                'rgba(255, 128, 0)',
                'rgba(55, 128, 0)',
                'rgba(255, 255, 0)',
              ]
            }
           ];
  public etiquetas_Chart_Estados: string[] = [];
  public data_Chart_Estados: number[] = [];
  public pieChartType = 'pie';
  public opciones_Chart_Estados = { // intento de titulo enmarcado
    title: {
      text: 'MENSAJES',
      display: true
    },
    legend: {
        display: true,
        position:	'right'
    }
  };
  public etiquetas_Chart_Categoria: string[] = [];
  public data_Chart_Categoria: number[] = [];
  public opciones_Chart_Categoria = { // intento de titulo enmarcado
    title: {
      text: 'CATEGORIAS',
      display: true
    },
    legend: {
        display: true,
        position:	'right',
        labels: { fontSize: 9 }
    }
  };
  public etiquetas_Chart_Mes: string[] = [];
  public data_Chart_Mes: number[] = [];
  public opciones_Chart_Mes = { // intento de titulo enmarcado
    title: {
      text: 'MENSUAL',
      display: true
    },
    legend: {
        display: true,
        position:	'left'
    }
  };

  Fechas_mes_to_php () {
    let  fechaInicio = new Date( 2018, this.mes-1 , 1 ,0,0,1 ).toISOString().substr(0, 19).replace('T', ' ');
    let fechaFinal = new Date( 2018, this.mes , 1 ,0,0,1).toISOString().substr(0, 19).replace('T', ' ');
    // console.log("F i",fechaInicio);
    // console.log("F F",fechaFinal);
    this.buscarconteoestados(fechaInicio, fechaFinal );
    this.buscarconteocategorias(fechaInicio, fechaFinal );
    this.buscarMensajes(fechaInicio, fechaFinal );
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private busquedaService: BusquedaService) {
  }

  ngOnInit() {
     this.logged = JSON.parse(localStorage.getItem('user'));
     this.buscarMensajes();
     this.buscarConteoEstados();
     this.buscarConteoCategorias();
     this.buscarConteoMensual();

  }

  buscarConteoCategorias(fecha1 = null, fecha2 = null) {
      const datos = { tipo: 'contador', formato: 'categoria', usuario: this.logged, fechainicio: fecha1, fechafinal: fecha2};
      this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => {
          const clone = data.valores;
          this.data_Chart_Categoria = clone;
          data.titulos.forEach( item => this.etiquetas_Chart_Categoria.push( item ) );
        } );
  }

  buscarConteoEstados(fecha1 = null, fecha2 = null) {
      const datos = { tipo: 'contador', formato: 'estado', usuario: this.logged, fechainicio: fecha1, fechafinal: fecha2};
      this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => {
          const clone = data.valores;
          this.data_Chart_Estados = clone;
          data.titulos.forEach( item => this.etiquetas_Chart_Estados.push( item ) );
        } );
  }

  buscarConteoMensual(fecha1 = null, fecha2 = null) {
      const datos = { tipo: 'contador', formato: 'mes', usuario: this.logged, fechainicio: fecha1, fechafinal: fecha2};
      this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => {
          const clone = data.valores;
          this.data_Chart_Mes = clone;
          data.titulos.forEach( item => this.etiquetas_Chart_Mes.push( item ) );
        } );
  }

  buscarDetalleMensajes( valor ) {
      this.mensaje = valor;
      const datos = { tipo: 'mensajes', usuario: this.logged, filtro: { tipo: 'camada', valor: valor.camada} };
      this.busquedaService.obtenerDatos( JSON.stringify(datos) ,
              data => { this.mensajes = data;
              setTimeout(() => { this.loadingIndicator = false; }, 1500); });
  }

  buscarMensajes(fecha1 = null, fecha2 = null) {
      const datos = { tipo: 'mensajes', usuario: this.logged, agrupacion: 'destinatarios' , fechainicio: fecha1, fechafinal: fecha2 };
      this.busquedaService.obtenerDatos( JSON.stringify(datos) ,
              data => { this.datarecibida = data;
              setTimeout(() => { this.loadingIndicator = false; }, 1500); });
  }

  cambiarTexto( texto: string , quien = null ) {
      if ( quien ) {

        return texto.replace(/\#\#\(nombre\)/ig, quien.nombre.substring(0, 10) )
                    .replace(/\#\#\(apelli\)/ig, quien.apellidoP.substring(0, 10) )
                    .replace('#@', (quien.genero === 'Femenino') ? 'a' : 'o' )
                    .replace(/\#\#\(barrio\)/ig, quien.barrio.substring(0, 10) )
                    .replace(/@\s/g, (quien.genero === 'Femenino') ? 'a ' : 'o ' );
      }

      return texto;
    }
}
