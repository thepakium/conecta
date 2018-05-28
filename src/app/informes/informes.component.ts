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


  
  constructor(private busquedaService: BusquedaService) { 
    this.buscarMensajes();

}
  ngOnInit() {
    
    }
    buscarMensajes() {
      const datos = { tipo: 'mensajes'};
      this.busquedaService.obtenerDatos( JSON.stringify(datos) , data => { this.datarecibida = data; console.log(this.datarecibida);} );
  }
    


}


interface Mensaje {
  nombre: string;
  fecha_creacion: string;
  fecha_envio: string;
  body: string;
  t_to: string;
  cliente: string;
  estado: string;}