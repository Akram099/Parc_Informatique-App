import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MarchéService } from 'src/app/Services/marché.service';
import { marché } from 'src/app/models/Marché';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-marche',
  templateUrl: './add-marche.component.html',
  styleUrls: ['./add-marche.component.css']
})
export class AddMarcheComponent {

  marche : marché[] = []
  
  addmarcheRequest: marché = {
    num_Marche : '',
    date_marche : '',
    date_reception : '',
    fournisseur : '',
  }
  
  constructor(private router: Router, private marchéService: MarchéService, private toast: NgToastService) {}

  ngOnInit(): void {

    this.marchéService.GetMarché()
    .subscribe(mar =>{
      this.marche = mar
    })
  }

  CreateMarche(){
    this.marchéService.CreateMarché(this.addmarcheRequest)
    .subscribe({
      next: (marches) =>{
        this.router.navigate(['marchés']);
        this.toast.success({detail:"SUCCESS",summary:"Marché Ajouter!",duration:5000, position:'topRight'});      
      }
    })
  }
}
