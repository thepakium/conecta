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

  filtroBusqueda: Filtro = new Filtro;
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
  public pieChartType = 'pie';
  datosEstado: Dato;
  public etiquetas_Chart_Estados: string[] = [];
  public data_Chart_Estados: number[] = [];
  public opciones_Chart_Estados = { // intento de titulo enmarcado
    title: {
      text: 'MENSAJES',
      display: true,
      fontColor: 'black'
    },
    legend: {
        display: true,
        position:	'right',
        labels: {
          fontColor: 'black'
          }

    }
  };
  datosCategoria: Dato;
  public etiquetas_Chart_Categoria: string[] = [];
  public data_Chart_Categoria: number[] = [];
  public opciones_Chart_Categoria = { // intento de titulo enmarcado
    title: {
      text: 'CATEGORIAS',
      display: true,
      fontColor: 'black'
    },
    legend: {
        display: true,
        position:	'right',
        labels: {
          fontSize: 9,
          fontColor: 'black'
          }
    }
  };
  datosMes: Dato;
  public etiquetas_Chart_Mes: string[] = [];
  public data_Chart_Mes: number[] = [];
  public opciones_Chart_Mes = { // intento de titulo enmarcado
    title: {
      text: 'MENSUAL',
      display: true,
      fontColor: 'black'
    },
    legend: {
        display: true,
        position:	'left'
    }
  };

  constructor(private busquedaService: BusquedaService) {
  }

  ngOnInit() {
     this.logged = JSON.parse(localStorage.getItem('user'));
     this.buscarDatos();
  }

  buscarDatos () {
    this.buscarConteoEstados( this.filtroBusqueda );
    this.buscarConteoCategorias( this.filtroBusqueda );
    this.buscarConteoMensual( this.filtroBusqueda );
    this.buscarMensajes( this.filtroBusqueda );
  }

  // events
  public chartClicked(e: any , tipo: string): void {
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if ( activePoints.length > 0) {
       // get the internal index of slice in pie chart
       const clickedElementIndex = activePoints[0]._index;
       const label = chart.data.labels[clickedElementIndex];
       // get value by index
       const value = chart.data.datasets[0].data[clickedElementIndex];
       switch ( tipo ) {
         case 'mensual':
            const anoInicio = this.datosMes.year[clickedElementIndex];
            const mesInicio = this.datosMes.month[clickedElementIndex];
            const anoTermino = (mesInicio < 12) ? anoInicio : anoInicio + 1;
            const mesTermino = (mesInicio < 12) ? +mesInicio + +1 : 1;
            this.filtroBusqueda.fechaInicio = `${anoInicio}${(mesInicio < 10) ? 0 : ''}${mesInicio}01`;
            this.filtroBusqueda.fechaTermino = `${anoTermino}${(mesTermino < 10) ? 0 : ''}${mesTermino}01`;
            this.filtroBusqueda.nombreFecha = label;
            break;
          case 'categoria':
            this.filtroBusqueda.categoria = this.datosCategoria.id[clickedElementIndex];
            this.filtroBusqueda.nombreCategoria = label;
            break;
          case 'estado':
            this.filtroBusqueda.estado = this.datosEstado.id[clickedElementIndex];
            this.filtroBusqueda.nombreEstado = label;
            break;
       }
        this.buscarDatos();

      }
     }
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  exporta_mes() {
    window.open(`http://www.ahoraconectados.cl/sms/export_repo_mes.php`, '_blank');
  }
  exporta_year() {
    window.open(`http://www.ahoraconectados.cl/sms/export_repo_year.php`, '_blank');
  }

  borrarFiltros() {
    this.filtroBusqueda = new Filtro;
    this.buscarDatos();
  }

  buscarConteoCategorias(filtro = null) {
    this.etiquetas_Chart_Categoria.splice(0, this.etiquetas_Chart_Categoria.length);
      const datos = { tipo: 'contador', formato: 'categoria', usuario: this.logged, filtro: filtro};
      this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => {
          this.datosCategoria = data;
          this.data_Chart_Categoria = data.valores;
          this.etiquetas_Chart_Categoria.push( ...data.titulos );
        } );
  }

  buscarConteoEstados(filtro = null) {
    this.etiquetas_Chart_Estados.splice(0, this.etiquetas_Chart_Estados.length);
      const datos = { tipo: 'contador', formato: 'estado', usuario: this.logged, filtro: filtro};
      this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => {
          this.datosEstado = data;
          this.data_Chart_Estados = data.valores;
          this.etiquetas_Chart_Estados.push( ...data.titulos );
        } );
  }

  buscarConteoMensual(filtro = null) {
    this.etiquetas_Chart_Mes.splice(0, this.etiquetas_Chart_Mes.length);
      const datos = { tipo: 'contador', formato: 'mes', usuario: this.logged, filtro: filtro};
      this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => {
          this.datosMes = data;
          this.data_Chart_Mes = data.valores;
          this.etiquetas_Chart_Mes.push( ...data.titulos);
        } );
  }

  buscarDetalleMensajes( valor ) {
      this.mensaje = valor;
      const datos = { tipo: 'mensajes', usuario: this.logged, filtro: { tipo: 'camada', valor: valor.camada} };
      this.busquedaService.obtenerDatos( JSON.stringify(datos) ,
              data => { this.mensajes = data;
              setTimeout(() => { this.loadingIndicator = false; }, 1500); });
  }

  buscarMensajes(filtro = null) {
      const datos = { tipo: 'mensajes', usuario: this.logged, agrupacion: 'destinatarios' , filtro: filtro };
      this.busquedaService.obtenerDatos( JSON.stringify(datos) ,
              data => { this.datarecibida = data;
              setTimeout(() => { this.loadingIndicator = false; }, 1500); });
  }

  cambiarTexto( texto: string , quien = null ) {
      if ( quien ) {

        return texto.replace(/\#\#\(nombre\)/ig, quien.nombre.substring(0, 10) )
                    .replace(/\#\#\(apelli\)/ig, quien.apellidoP.substring(0, 10) )
                    .replace('#@', (quien.genero === 'Femenino') ? 'a' : 'o' )
                    .replace(/\#\#\(grupo\)/ig, quien.grupo.substring(0, 10) )
                    .replace(/@\s/g, (quien.genero === 'Femenino') ? 'a ' : 'o ' );
      }

      return texto;
    }
}

class Filtro {
  tipo: string;
  fechaInicio: string;
  fechaTermino: string;
  nombreFecha: string;
  categoria: string;
  nombreCategoria: string;
  estado: string;
  nombreEstado; string;
}

interface Dato {
  titulos: string[];
  valores: string[];
  id: string[];
  year: number[];
  month: number[];
}
