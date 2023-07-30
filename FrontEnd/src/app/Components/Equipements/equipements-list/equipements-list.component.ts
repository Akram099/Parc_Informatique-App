import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipementService } from 'src/app/Services/equipement.service';
import { equipement } from 'src/app/models/Equipement';

@Component({
  selector: 'app-equipements-list',
  templateUrl: './equipements-list.component.html',
  styleUrls: ['./equipements-list.component.css']
})
export class EquipementListComponent implements OnInit{
  
  term: string = '';
  sideNavStatus:boolean=false;
  equipements: equipement[] = [];
  p:number=1;

  constructor(private equipementService: EquipementService){ }

  ngOnInit(): void {

    this.equipementService.GetEquipement()
    .subscribe({
      next: (equipements) => {
        this.equipements = (equipements);
      },
      error: (response) => {
        console.log(response);
      }
    })

  }

}
