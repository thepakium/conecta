import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginformComponent } from './loginform/loginform.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MsjdirComponent } from './msjdir/msjdir.component';
import { PersonalComponent } from './personal/personal.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { MsjgrupalComponent } from './msjgrupal/msjgrupal.component';

const appRoutes:Routes = [
  {
    path: '',
    component: LoginformComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },  
  {
    path: 'msjdir',
    component: MsjdirComponent
  },
  {
    path: 'msjgrupal',
    component: MsjgrupalComponent
  },  
  {
    path: '**',
    component: NoEncontradoComponent
  }

]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginformComponent,
    FooterComponent,
    DashboardComponent,
    MsjdirComponent,
    PersonalComponent,
    NoEncontradoComponent,
    MsjgrupalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
