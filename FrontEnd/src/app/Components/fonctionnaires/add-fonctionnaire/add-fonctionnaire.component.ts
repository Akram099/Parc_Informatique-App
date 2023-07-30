import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';
import { fonctionnaire } from 'src/app/models/Fonctionnaire';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-fonctionnaire',
  templateUrl: './add-fonctionnaire.component.html',
  styleUrls: ['./add-fonctionnaire.component.css']
})


export class AddFonctionnaireComponent implements OnInit{
  
  addfonctionnaireRequest: fonctionnaire = {
    fonctionnaire_ID : '',
    nom : '',
    prenom : '',
    username : '',
    password : '',
    email : '',
    telephone : '',
    role : '',
    service_ID: ''
  }

  constructor(private employeeservice: EmployeeService, private router: Router, private toast: NgToastService) {}

  ngOnInit(): void {
    
  }

  CreateEmployee(){
    this.employeeservice.CreateEmployee(this.addfonctionnaireRequest)
    .subscribe({
      next: (fonctionnaires) =>{
        this.router.navigate(['fonctionnaires']);
        this.toast.success({detail:"SUCCESS",summary:"Fonctionnaire Ajouter!",duration:5000, position:'topRight'});      
      }
    })
  }
}
