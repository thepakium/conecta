import { Component,OnInit } from '@angular/core';
import { Usuario, Username } from 'src/app/share/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logged: Username;
  title = 'app';
  constructor() { }

  ngOnInit() {
    this.logged = JSON.parse(localStorage.getItem('user'));
  }

}
