import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginformComponent } from './loginform/loginform.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { MsjdirComponent } from './msjdir/msjdir.component';
import { PersonalComponent } from './personal/personal.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgSelectModule, NG_SELECT_DEFAULT_CONFIG } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthGuard } from './share';
import { InformesComponent } from './informes/informes.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { PerfilesComponent } from './perfiles/perfiles.component';


// AoT requires an exported function for factories

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginformComponent
  },
  {
    path: 'mensajes',   canActivate: [AuthGuard],   component: MsjdirComponent
  },
  {
    path: 'personas',   canActivate: [AuthGuard],    component: PersonalComponent
  },
  { path: '', redirectTo: 'mensajes', pathMatch: 'full' },
  {
    path: 'reportes', canActivate: [AuthGuard],    component: InformesComponent
  },
  {
    path: 'perfiles', canActivate: [AuthGuard],    component: PerfilesComponent
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
    MsjdirComponent,
    PersonalComponent,
    NoEncontradoComponent,
    InformesComponent,
    PerfilesComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NgSelectModule,
    ChartsModule,
    FormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    ToastrModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [AuthGuard,
    {
        provide: NG_SELECT_DEFAULT_CONFIG,
        useValue: {
            notFoundText: 'Elementos no encontrados',
            addTagText: 'Ingrese elemento',
            typeToSearchText: 'Escriba para buscar',
            loadingText: 'Cargando...',
            clearAllText: 'Limpiar todo'
        }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
