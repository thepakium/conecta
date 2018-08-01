import { Component, OnInit } from '@angular/core';
import { Usuario, Username } from 'src/app/share/models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
  
})
export class SidemenuComponent implements OnInit {
  logged: Username;

  constructor(private router: Router,) { }

  ngOnInit() {
    this.logged = JSON.parse(localStorage.getItem('user'));
  }
  logout() {
    localStorage.removeItem('conecta2In');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
