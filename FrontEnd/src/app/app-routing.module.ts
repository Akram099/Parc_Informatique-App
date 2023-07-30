import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { FonctionnairesListComponent } from './Components/fonctionnaires/fonctionnaires-list/fonctionnaires-list.component';
import { AddFonctionnaireComponent } from './Components/fonctionnaires/add-fonctionnaire/add-fonctionnaire.component';
import { EditFonctionnaireComponent } from './Components/fonctionnaires/edit-fonctionnaire/edit-fonctionnaire.component';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EquipementListComponent } from './Components/Equipements/equipements-list/equipements-list.component';
import { AddEquipementComponent } from './Components/Equipements/add-equipement/add-equipement.component';
import { EditEquipementComponent } from './Components/Equipements/edit-equipement/edit-equipement.component';
import { MarchesListComponent } from './Components/marches/marches-list/marches-list.component';
import { EditMarcheComponent } from './Components/marches/edit-marche/edit-marche.component';
import { AddMarcheComponent } from './Components/marches/add-marche/add-marche.component';
import { hasroleGuard } from './guards/hasrole.guard';
import { RequetesListComponent } from './Components/Requetes/requetes-list/requetes-list.component';
import { AddRequeteComponent } from './Components/Requetes/add-requete/add-requete.component';
import { EditRequeteComponent } from './Components/Requetes/edit-requete/edit-requete.component';
import { AccueilComponent } from './Components/accueil/accueil.component';

const routes: Routes = [

  {path:'' ,redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'accueil',component:AccueilComponent, canActivate:[AuthGuard]},
  {path:'requetes',component:RequetesListComponent, canActivate:[AuthGuard,hasroleGuard],
    data: {
      role: ['Administrateur','Chef Service','Technicien','Fonctionnaire']
    }
  },
  {path:'requetes/add',component:AddRequeteComponent, canActivate:[AuthGuard,hasroleGuard],
    data: {
      role: ['Administrateur','Chef Service']
    }
  },
  {path:'requetes/edit/:id',component:EditRequeteComponent, canActivate:[AuthGuard,hasroleGuard],
    data: {
      role: ['Administrateur','Chef Service']
    }
  },
  {path:'equipements',component:EquipementListComponent, canActivate:[AuthGuard,hasroleGuard],
    data: {
      role: ['Administrateur','Chef Service','Technicien']
    }
  },
  {path:'equipements/add',component:AddEquipementComponent, canActivate:[AuthGuard,hasroleGuard],
    data: {
      role: ['Administrateur','Chef Service','Technicien']
    }
  },
  {path:'equipements/edit/:id',component:EditEquipementComponent, canActivate:[AuthGuard,hasroleGuard],
    data: {
      role: ['Administrateur','Chef Service','Technicien']
    }
  },
  {path:'fonctionnaires',component:FonctionnairesListComponent, canActivate:[AuthGuard,hasroleGuard],
    data: {
      role: ['Administrateur']
    }
  },
  {path:'fonctionnaires/add',component:AddFonctionnaireComponent, canActivate:[AuthGuard,hasroleGuard],
    data: {
      role: ['Administrateur']
    }
  },
  {path:'fonctionnaires/edit/:id',component:EditFonctionnaireComponent, canActivate:[AuthGuard,hasroleGuard],
    data: {
      role: ['Administrateur']
    }
  },
  {path:'marchés',component:MarchesListComponent, canActivate:[AuthGuard,hasroleGuard],
    data: {
      role: ['Administrateur','Chef Service','Technicien']
    }
  },
  {path:'marchés/add',component:AddMarcheComponent, canActivate:[AuthGuard,hasroleGuard],
    data: {
      role: ['Administrateur','Chef Service']
    }
  },
  {path:'marchés/edit/:id',component:EditMarcheComponent, canActivate:[AuthGuard,hasroleGuard],
    data: {
      role: ['Administrateur','Chef Service']
    }
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
