import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../share/busqueda.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sugerencias = 'escriba aqui su comentario';
  constructor(private busquedaService: BusquedaService) { }

  ngOnInit() {
  }
 // send(): void { //ESPERANDO sendData
 //   this.busquedaService.sendSugerido(this.sugerencias)
 //     .subscribe(res => console.log(res));
 // }
}
