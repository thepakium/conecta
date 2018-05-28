import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
import { NgSelectModule, NG_SELECT_DEFAULT_CONFIG } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { IngresaPersonaComponent } from './ingresa-persona/ingresa-persona.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthGuard } from './share';
import { InformesComponent } from './informes/informes.component';


// AoT requires an exported function for factories

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginformComponent
  },
  {
    path: 'msjdir',   canActivate: [AuthGuard],
    component: MsjdirComponent
  },
  {
    path: 'msjgrupal',  canActivate: [AuthGuard],
    component: MsjgrupalComponent
  },
  {
    path: 'personal',   canActivate: [AuthGuard],
    component: PersonalComponent
  },
  { path: '', redirectTo: 'msjdir', pathMatch: 'full' },
  {
    path: 'ingresapersona',
    component: IngresaPersonaComponent
  },
  {
    path: 'informe',
    component: InformesComponent
  },
  {
    path: '**',
    component: NoEncontradoComponent
  }

];

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
    IngresaPersonaComponent,
    InformesComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [AuthGuard,
    {
        provide: NG_SELECT_DEFAULT_CONFIG,
        useValue: {
            notFoundText: 'Items not found',
            addTagText: 'Add item',
            typeToSearchText: 'Type to search',
            loadingText: 'Loading...',
            clearAllText: 'Clear all'
        }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
