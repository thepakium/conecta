import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../share/busqueda.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  sugerencias = 'escriba aqui su comentario';
  //el: angular.element('#divId');
  //el.attr('attr-name', 'attr-value');
  constructor(private busquedaService: BusquedaService) { }
  estado="btn btn-primary float-top-s";
  ngOnInit() {
    this.retirarboton()
  }
 // send(): void { //ESPERANDO sendData
 //   this.busquedaService.sendSugerido(this.sugerencias)
 //     .subscribe(res => console.log(res));
 moverin():void{
   this.estado="btn btn-primary float-top-s"
 }
 moverout():void{
   this.estado="btn btn-primary float-top-h"
 }
 retirarboton():void{
  setTimeout(() => { this.moverout(); }, 1000);
 }
}
