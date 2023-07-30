import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {

  @Output() sideNavToggled=new EventEmitter<boolean>();
  menustatus :boolean=false;

  public role!: string;
  public fullName : string = "";

  constructor(private userstore: UserStoreService, private auth: AuthService, private router: Router){ }

  ngOnInit(): void {

    this.userstore.getFullNameFromStore()
    .subscribe(val=>{
      const FullNameFromStore = this.auth.getfullNameFromToken();
      this.fullName = val || FullNameFromStore
    });

    this.userstore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }

  signout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  SideNavToggled(){
  
    this.menustatus=!this.menustatus;
    this.sideNavToggled.emit(this.menustatus);
  }
}