import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/Services/employee.service';
import { RequeteService } from 'src/app/Services/requete.service';
import { fonctionnaire } from 'src/app/models/Fonctionnaire';
import { Requete } from 'src/app/models/Requete';

@Component({
  selector: 'app-edit-requete',
  templateUrl: './edit-requete.component.html',
  styleUrls: ['./edit-requete.component.css']
})
export class EditRequeteComponent {
  
  requete : Requete[] = []

  arayadmin: fonctionnaire[] = [];
  araytech: fonctionnaire[] = [];
  arayfonc: fonctionnaire[] = [];

  public ad="Administrateur";
  public tc="Technicien";
  public fc="Fonctionnaire";

  
  constructor(private router: Router, private route: ActivatedRoute, private requeteservice: RequeteService, private toast: NgToastService,private employeeservice: EmployeeService) {}
  
  requeteDetails: Requete = {
    num_Identification: '',
    description: '',
    date_prise_en_charge: new Date(),
    date_cloture: null,
    etat_Requete: '',
    administrateur_ID: '',
    technicien_ID: '',
    fonctionnaire_ID: '',
  };

  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id){
          this.requeteservice.Requete(id)
          .subscribe({
            next: (response) => {
              this.requeteDetails = response;
              console.log(response);
            }
          });
        }
      }
    })

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

  updateRequete(){
    this.requeteservice.updateRequete(this.requeteDetails.num_Identification, this.requeteDetails)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['requetes']);
        this.toast.info({detail:"INFO",summary:'Requete Modifier!', duration:5000, position: 'topRight'});
      }
    });
  }
  
  DeleteRequete(num_Identification: string){
    this.requeteservice.DeleteRequete(num_Identification)
    .subscribe({
      next: (response) => {
        this.router.navigate(['requetes']);
        this.toast.error({detail:"SUPPRESSION",summary:'Requete Supprimer!', duration:5000, position: 'topRight'});
      }
    });
  }
}
