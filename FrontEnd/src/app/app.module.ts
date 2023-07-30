import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { FonctionnairesListComponent } from './Components/fonctionnaires/fonctionnaires-list/fonctionnaires-list.component';
import { AddFonctionnaireComponent } from './Components/fonctionnaires/add-fonctionnaire/add-fonctionnaire.component';
import { EditFonctionnaireComponent } from './Components/fonctionnaires/edit-fonctionnaire/edit-fonctionnaire.component';
import { LoginComponent } from './Components/login/login.component';
import { HeaderComponent } from './Components/header/header.component';
import { SideNavComponent } from './Components/side-nav/side-nav.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EquipementListComponent } from './Components/Equipements/equipements-list/equipements-list.component';
import { AddEquipementComponent } from './Components/Equipements/add-equipement/add-equipement.component';
import { EditEquipementComponent } from './Components/Equipements/edit-equipement/edit-equipement.component';
import { MarchesListComponent } from './Components/marches/marches-list/marches-list.component';
import { AddMarcheComponent } from './Components/marches/add-marche/add-marche.component';
import { EditMarcheComponent } from './Components/marches/edit-marche/edit-marche.component';

import { NgToastModule } from 'ng-angular-popup';
import { DatePipe } from '@angular/common';
import { FilterPipePipe } from './Components/filter-pipe.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { RequetesListComponent } from './Components/Requetes/requetes-list/requetes-list.component';
import { AddRequeteComponent } from './Components/Requetes/add-requete/add-requete.component';
import { EditRequeteComponent } from './Components/Requetes/edit-requete/edit-requete.component';
import { AccueilComponent } from './Components/accueil/accueil.component';

 
@NgModule({
  declarations: [
    AppComponent,
    FonctionnairesListComponent,
    AddFonctionnaireComponent,
    EditFonctionnaireComponent,
    LoginComponent,
    HeaderComponent,
    SideNavComponent,
    DashboardComponent,
    EquipementListComponent,
    AddEquipementComponent,
    EditEquipementComponent,
    MarchesListComponent,
    AddMarcheComponent,
    EditMarcheComponent,
    FilterPipePipe,
    RequetesListComponent,
    AddRequeteComponent,
    EditRequeteComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgToastModule,
    NgxPaginationModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
  DatePipe
],
  bootstrap: [AppComponent]
})
export class AppModule { }
