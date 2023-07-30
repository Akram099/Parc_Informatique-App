import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { MarchéService } from 'src/app/Services/marché.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { marché } from 'src/app/models/Marché';

@Component({
  selector: 'app-equipements-list',
  templateUrl: './marches-list.component.html',
  styleUrls: ['./marches-list.component.css']
})
export class MarchesListComponent implements OnInit{
  
  term: string = '';
  sideNavStatus:boolean=false;
  marches: marché[] = [];
  public role:string="";
  p:number=1;


  constructor(private marchéService: MarchéService, private userStore: UserStoreService, private auth: AuthService){ }

  ngOnInit(): void {

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken=this.auth.getRoleFromToken();
      this.role=val || roleFromToken;
    
    })

    this.marchéService.GetMarché()
    .subscribe({
      next: (marches) => {
        this.marches = (marches);
      },
      error: (response) => {
        console.log(response);
      }
    })

  }

}
