import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { EquipementService } from 'src/app/Services/equipement.service';
import { RequeteService } from 'src/app/Services/requete.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit{

  constructor(private auth:AuthService,private requise:RequeteService,private serfonc:EmployeeService,private equi:EquipementService){}

  public nbc:string="";

  public nbnotc:string="";

  public coufonc:string="";

  public countequi:string="";

  ngOnInit(): void {
    
    this.requise.getCountReqCL().subscribe(res1 =>{
      this.nbc=String(res1);
    
    });

    this.requise.getCountReqnotCL().subscribe(res2 =>{
      this.nbnotc=String(res2);
    
    });

    this.serfonc.getCountFonc().subscribe(res3 =>{
      this.coufonc=String(res3);
    
    });

    this.equi.getCountEqui().subscribe(res4 =>{
      this.countequi=String(res4);

    });

  }
}
