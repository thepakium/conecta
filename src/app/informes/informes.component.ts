import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BusquedaService } from '../share/busqueda.service';
import { Usuario } from 'src/app/share/models';
import { environment } from '../../environments/environment';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css'],
  providers: [BusquedaService]
})

export class InformesComponent implements OnInit {
  datarecibida: Estates[];
  usuario: Usuario;
  Contador_estates: Estates[];
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
            {id: 12, name: 'Diciembre'},
          ];
  public pieChartColors = [
            {
              backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(0, 255, 0)',
                'rgba(102, 0, 204)',
                'rgba(255, 128, 0)'
              ]
            }
            ];
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType = 'pie';

  Fechas_mes_to_php (){
    let  fechaInicio = new Date( 2018, this.mes-1 , 1 ,0,0,1 ).toISOString().substr(0, 19).replace('T', ' ');
    let fechaFinal = new Date( 2018, this.mes , 1 ,0,0,1).toISOString().substr(0, 19).replace('T', ' ');
    console.log("F i",fechaInicio);
    console.log("F F",fechaFinal);
    this.buscarconteoestados(fechaInicio, fechaFinal );
  }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(private busquedaService: BusquedaService) {
  }

  ngOnInit() {
     this.usuario = JSON.parse(localStorage.getItem('user'));
     this.buscarMensajes();
  }

  buscarconteoestados(fecha1, fecha2) {
      this.pieChartLabels = [];
      const datos = { tipo: 'contador_estados', fechainicio: fecha1, fechafinal: fecha2};
      this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => {
        this.Contador_estates = data;
        const cloneb = JSON.parse(JSON.stringify(this.pieChartData));
        for (let i = 0; i < this.Contador_estates.length; i++) {
          cloneb[i] = this.Contador_estates[i].cuantose;
          this.pieChartLabels.push(this.Contador_estates[i].estado);
          }
        this.pieChartData = cloneb;
        } );
      }

  buscarMensajes() {
      const datos = { tipo: 'mensajes', usuario: this.usuario };
      this.busquedaService.obtenerDatos( JSON.stringify(datos) ,
              data => { this.datarecibida = data;
              // console.log(this.datarecibida);
              setTimeout(() => { this.loadingIndicator = false; }, 1500); });
      }
}

interface Estates {
  estado: string;
  cuantose: string;
}
