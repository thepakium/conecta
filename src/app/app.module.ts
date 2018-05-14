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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';
// AoT requires an exported function for factories

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
    MsjgrupalComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
