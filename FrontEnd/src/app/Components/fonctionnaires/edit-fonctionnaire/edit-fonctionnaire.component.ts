import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';
import { fonctionnaire } from 'src/app/models/Fonctionnaire';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-fonctionnaire',
  templateUrl: './edit-fonctionnaire.component.html',
  styleUrls: ['./edit-fonctionnaire.component.css']
})
export class EditFonctionnaireComponent implements OnInit{
  
  constructor(private fb:FormBuilder, private route: ActivatedRoute, private employeeservice: EmployeeService, private router: Router, private toast: NgToastService) {}
  
  EditForm!: FormGroup;

  employeeDetails: fonctionnaire = {
    fonctionnaire_ID : '',
    nom : '',
    prenom : '',
    username : '',
    password : '',
    email : '',
    telephone : '',
    role : '',
    service_ID: ''
  };


  ngOnInit(): void{
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id){
          this.employeeservice.Employee(id)
          .subscribe({
            next: (response) => {
              this.employeeDetails = response;
            }
          });
        }
      }
    })
  }

  updateEmployee(){
    this.employeeservice.updateEmployee(this.employeeDetails.fonctionnaire_ID, this.employeeDetails)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['fonctionnaires']);
        this.toast.info({detail:"INFO",summary:'Fonctionnaire Modifier!', duration:5000, position: 'topRight'});
      }
    });
  }

  DeleteEmployee(fonctionnaire_ID: string){
    this.employeeservice.DeleteEmployee(fonctionnaire_ID)
    .subscribe({
      next: (response) => {
        this.router.navigate(['fonctionnaires']);
        this.toast.error({detail:"SUPPRESSION",summary:'Fonctionnaire Supprimer!', duration:5000, position: 'topRight'});
      }
    });
  }

}
