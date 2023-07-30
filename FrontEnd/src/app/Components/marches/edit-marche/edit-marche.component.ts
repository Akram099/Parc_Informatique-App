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
import { DatePipe } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-edit-equipement',
  templateUrl: './edit-marche.component.html',
  styleUrls: ['./edit-marche.component.css']
})
export class EditMarcheComponent implements OnInit{

  typeequi : type_equipement[] = []
  marches : marché[] = []

  
  constructor(private fb:FormBuilder, private route: ActivatedRoute, private equipementservice: EquipementService, private router: Router, private typeEquipementService: TypeEquipementService, private caractéristiqueService: CaractéristiqueService, private marchéService: MarchéService, private datepipe: DatePipe, private toast: NgToastService) {}
  
  EditForm!: FormGroup;

  marchesDetails: marché = {
    num_Marche : '',
    date_marche : '',
    date_reception : '',
    fournisseur : ''
  };


  ngOnInit(): void{
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id){
          this.marchéService.Marché(id)
          .subscribe({
            next: (response) => {
              this.marchesDetails = response;
            }
          });
        }
      }
    })
  }

  updateMarche(){
    this.marchéService.updateMarché(this.marchesDetails.num_Marche, this.marchesDetails)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['marchés']);
        this.toast.info({detail:"INFO",summary:'Marché Modifier!', duration:5000, position: 'topRight'});
      }
    });
  }
  
  DeleteMarche(num_Marche: string){
    this.marchéService.DeleteMarché(num_Marche)
    .subscribe({
      next: (response) => {
        this.router.navigate(['marchés']);
        this.toast.error({detail:"SUPPRESSION",summary:'Marché Supprimer!', duration:5000, position: 'topRight'});
      }
    });
  }

}
