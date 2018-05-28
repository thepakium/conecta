import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BusquedaService } from '../share/busqueda.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css'],
  providers: [BusquedaService]
})
export class InformesComponent implements OnInit {
  datarecibida: Mensaje[];
  Contador_sms_mes: Conta[];


  
  constructor(private busquedaService: BusquedaService) { 
    this.buscarMensajes();
    this.buscarconteosms();

}
  ngOnInit() {
    
    }
    buscarconteosms() {
      const datos = { tipo: 'contador_sms'};
      this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => { 
        this.Contador_sms_mes = data; 
        console.log(this.Contador_sms_mes);} );
  }
    buscarMensajes() {
      const datos = { tipo: 'mensajes'};
      this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => { 
        this.datarecibida = data; 
        console.log(this.datarecibida);} );
  }
    


}


interface Conta {
  cuantos: string;
}
interface Mensaje {
  nombre: string;
  fecha_creacion: string;
  fecha_envio: string;
  body: string;
  t_to: string;
  cliente: string;
  estado: string;}