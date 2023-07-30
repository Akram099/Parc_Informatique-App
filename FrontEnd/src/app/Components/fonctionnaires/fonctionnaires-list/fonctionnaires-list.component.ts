import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';
import { fonctionnaire } from 'src/app/models/Fonctionnaire';

@Component({
  selector: 'app-fonctionnaires-list',
  templateUrl: './fonctionnaires-list.component.html',
  styleUrls: ['./fonctionnaires-list.component.css']
})
export class FonctionnairesListComponent implements OnInit{
  
  term: string = '';
  sideNavStatus:boolean=false;
  fonctionnaires: fonctionnaire[] = [];
  p:number=1;


  constructor(private employeeService: EmployeeService){ }

  ngOnInit(): void {

    this.employeeService.GetEmployee()
    .subscribe({
      next: (fonctionnaires) => {
        this.fonctionnaires = (fonctionnaires);
      },
      error: (response) => {
        console.log(response);
      }
    })

  }

}
