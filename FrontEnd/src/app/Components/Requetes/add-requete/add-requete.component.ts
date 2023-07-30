import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/Services/employee.service';
import { RequeteService } from 'src/app/Services/requete.service';
import { fonctionnaire } from 'src/app/models/Fonctionnaire';
import { marché } from 'src/app/models/Marché';
import { Requete } from 'src/app/models/Requete';

@Component({
  selector: 'app-add-requete',
  templateUrl: './add-requete.component.html',
  styleUrls: ['./add-requete.component.css']
})
export class AddRequeteComponent {

  requete : Requete[] = []
  
  arayadmin: fonctionnaire[] = [];
  araytech: fonctionnaire[] = [];
  arayfonc: fonctionnaire[] = [];

  public ad="Administrateur";
  public tc="Technicien";
  public fc="Fonctionnaire";


  addrequeteRequest: Requete = {
    num_Identification: '',
    description: '',
    date_prise_en_charge: new Date(),
    date_cloture: null,
    etat_Requete: '',
    administrateur_ID: '',
    technicien_ID: '',
    fonctionnaire_ID: '',
  }
  
  constructor(private router: Router, private requeteservice: RequeteService, private toast: NgToastService,private employeeservice: EmployeeService) {}

  ngOnInit(): void {
    this.getFullnamealladmin();
    this.getFullnametechnicien();
    this.getFullnamefonctionnaire();
    
  }

  getFullnamealladmin(){
    this.employeeservice.getFullnamebyrole(this.ad)
    .subscribe((re) =>{
      console.log(re)
      this.arayadmin= re;
    })
  }
  getFullnametechnicien(){
    this.employeeservice.getFullnamebyrole(this.tc)
    .subscribe((re) =>{
      this.araytech= re;
    })
  }
  getFullnamefonctionnaire(){
    this.employeeservice.getFullnamebyrole(this.fc)
    .subscribe((re) =>{
      this.arayfonc= re;
    })
  }

  CreateRequete(){
    this.requeteservice.CreateRequete(this.addrequeteRequest)
    .subscribe({
      next: (requetes) =>{
        this.router.navigate(['requetes']);
        this.toast.success({detail:"SUCCESS",summary:"Requete Ajouter!",duration:5000, position:'topRight'});      
      }
    })
  }
}

