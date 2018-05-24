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

// AoT requires an exported function for factories

const appRoutes: Routes = [
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
    path: 'personal',
    component: PersonalComponent
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
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [
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
