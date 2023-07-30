import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CaractéristiqueService } from 'src/app/Services/caractéristique.service';
import { EquipementService } from 'src/app/Services/equipement.service';
import { MarchéService } from 'src/app/Services/marché.service';
import { TypeEquipementService } from 'src/app/Services/type-equipement.service';
import { caracteristique } from 'src/app/models/Caractéristique';
import { equipement } from 'src/app/models/Equipement';
import { marché } from 'src/app/models/Marché';
import { type_equipement } from 'src/app/models/Type_Equipement';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-equipement',
  templateUrl: './edit-equipement.component.html',
  styleUrls: ['./edit-equipement.component.css']
})
export class EditEquipementComponent implements OnInit{

  typeequi : type_equipement[] = []
  caractere : caracteristique[] = []
  marche : marché[] = []

  
  constructor(private fb:FormBuilder, private route: ActivatedRoute, private equipementservice: EquipementService, private router: Router, private typeEquipementService: TypeEquipementService, private caractéristiqueService: CaractéristiqueService, private marchéService: MarchéService, private toast: NgToastService) {}
  
  EditForm!: FormGroup;

  equipementDetails: equipement = {
    equipement_ID : '',
    archivee : '',
    num_Serie : '',
    iD_Type : '',
    num_Marche : '',
    iD_Caracteristique : ''
  };


  ngOnInit(): void{
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id){
          this.equipementservice.Equipement(id)
          .subscribe({
            next: (response) => {
              this.equipementDetails = response;
            }
          });
        }
      }
    })

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

  updateEquipement(){
    this.equipementservice.updateEquipement(this.equipementDetails.equipement_ID, this.equipementDetails)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['equipements']);
        this.toast.info({detail:"INFO",summary:'Equipement Modifier!', duration:5000, position: 'topRight'});
      }
    });
  }

  DeleteEmployee(equipement_ID: string){
    this.equipementservice.DeleteEquipement(equipement_ID)
    .subscribe({
      next: (response) => {
        this.router.navigate(['equipements']);
        this.toast.error({detail:"SUPPRESSION",summary:'Equipement Supprimer!', duration:5000, position: 'topRight'});
      }
    });
  }

}
