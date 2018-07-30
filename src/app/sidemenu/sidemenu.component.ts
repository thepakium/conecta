import { Component, OnInit } from '@angular/core';
import { Usuario, Username } from 'src/app/share/models';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
  
})
export class SidemenuComponent implements OnInit {
  logged: Username;

  constructor() { }

  ngOnInit() {
    this.logged = JSON.parse(localStorage.getItem('user'));
  }

}
