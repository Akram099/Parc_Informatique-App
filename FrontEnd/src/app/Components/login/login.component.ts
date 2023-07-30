import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/Helpers/validateForm';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  type: string = "password";
  istext:boolean =false;
  eyeIcon:string="fa-eye-slash";

  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  loginForm!: FormGroup;
  constructor(private fb:FormBuilder, private auth:AuthService, private router: Router, private userstore: UserStoreService,private toast: NgToastService) { }

  ngOnInit(): void {
    this.loginForm =this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
    
    })


  }

  hideshowPassword(){
    this.istext = !this.istext;
    this.istext ? this.eyeIcon = "fa-solid fa-eye" : this.eyeIcon="fa-eye-slash";
    this.istext ? this.type ="text" : this.type ="password";
  }

  onLogin(){
    if(this.loginForm.valid){

      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value)
      .subscribe({
        next :(res)=>{
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          const tokenPayload = this.auth.decodeToken();
          this.userstore.setFullNameForStore(tokenPayload.unique_name);
          this.userstore.setRoleForStore(tokenPayload.role);
          this.userstore.setIdStore(tokenPayload.nameid);
          this.router.navigate(['requetes']);
          this.toast.success({detail:"SUCCESS",summary:'Login avec succès!', duration:5000, position: 'topRight'});
        },
        error:(err)=>{
          this.toast.warning({detail:"ERREUR",summary:'Nom utilisateur ou Mot de passe Incorrecte!', duration:5000, position: 'topRight'});
          console.log(err);
        },
      });
    
    }else{
      ValidateForm.validateAllFormFileds(this.loginForm);
    }
  
  }
}
