import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';
import { RequeteService } from 'src/app/Services/requete.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { Requete } from 'src/app/models/Requete';

@Component({
  selector: 'app-requetes-list',
  templateUrl: './requetes-list.component.html',
  styleUrls: ['./requetes-list.component.css']
})
export class RequetesListComponent {

  RequFormgroup:FormGroup;

  term: string = '';
  p:number=1;
  public role:string="";
  public id:number=0;

  Requeteary : Requete[]=[];

  optionList: string[] = ['Initiale', 'Assigné', 'En cours', 'Fait', 'Clôturé']

  constructor(private fb: FormBuilder, private toast: NgToastService,private requeteservice:RequeteService,private userStore:UserStoreService,private auth:AuthService){
    this.RequFormgroup=this.fb.group({
      num_Identification:[""],
      description:[""],
      date_prise_en_charge:[""],
      date_cloture:[""],
      etat_Requete:[""],
      administrateur_ID:[""],
      technicien_ID:[""],
      fonctionnaire_ID:[""],
    })
  }

  ngOnInit(): void {

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken=this.auth.getRoleFromToken();
      this.role=val || roleFromToken;
    
    })

    this.userStore.getIdFromStore()
    .subscribe(val=>{
      const idFromToken=this.auth.getIdFromToken();
      this.id=val || idFromToken;
    
    })
    this.getRequetes();
  }

  getRequetes(){
    this.requeteservice.GetAllRequete( this.role, this.id).subscribe(response => {
      console.log(response);
      this.Requeteary=response;
    })
  }

  onOptionChange(requeteId: number, selectedOption: string){

    this.requeteservice.UpdateEtat(requeteId,selectedOption)
    .subscribe(se => {
      console.log("Etat de la requete mis à jour avec succés");
    });

    this.getRequetes();
    if(selectedOption == 'Clôturé'){
      this.toast.success({detail:"SUCCESS",summary:"Date Clôture Ajouter!",duration:5000, position:'topRight'});
    }

  }

}
