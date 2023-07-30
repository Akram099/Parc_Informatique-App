import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeEquipementService } from 'src/app/Services/type-equipement.service';
import { EquipementService } from 'src/app/Services/equipement.service';
import { CaractéristiqueService } from 'src/app/Services/caractéristique.service'
import { equipement } from 'src/app/models/Equipement';
import { type_equipement } from 'src/app/models/Type_Equipement';
import { caracteristique } from 'src/app/models/Caractéristique';
import { MarchéService } from 'src/app/Services/marché.service';
import { marché } from 'src/app/models/Marché';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-add-equipement',
  templateUrl: './add-equipement.component.html',
  styleUrls: ['./add-equipement.component.css']
})
export class AddEquipementComponent implements OnInit{

  typeequi : type_equipement[] = []
  caractere : caracteristique[] = []
  marche : marché[] = []

  addequipementRequest: equipement = {
    equipement_ID : '',
    archivee : '',
    num_Serie : '',
    iD_Type : '',
    num_Marche : '',
    iD_Caracteristique : ''
  }
  
  constructor(private equipementservice: EquipementService, private router: Router, private typeEquipementService: TypeEquipementService, private caractéristiqueService: CaractéristiqueService, private marchéService: MarchéService, private toast: NgToastService) {}

  ngOnInit(): void {

    this.typeEquipementService.GetTypeEquipement()
    .subscribe(ty =>{
      this.typeequi = ty
    })

    this.caractéristiqueService.GetCaractéristique()
    .subscribe(car =>{
      this.caractere = car
    })

    this.marchéService.GetMarché()
    .subscribe(mar =>{
      this.marche = mar
    })
  }

  CreateEquipement(){
    this.equipementservice.CreateEquipement(this.addequipementRequest)
    .subscribe({
      next: (equipements) =>{
        this.router.navigate(['equipements']);
        this.toast.success({detail:"SUCCESS",summary:"Equipement Ajouter!",duration:5000, position:'topRight'});      
      }
    })
  }
}
