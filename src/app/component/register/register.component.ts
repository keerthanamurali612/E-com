import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formdata={name:"",email:"",password:""};
  submit=false;
  errorMessage="";
  loading=false;
  
  constructor( private auth:AuthService){}

  onSubmit(){
   
    this.loading=true;

    //call register service

    this.auth
    .register(this.formdata.name,this.formdata.email,this.formdata.password)
    .subscribe({
      next:data=>{
        //store token from response data

        this.auth.storeToken(data.idToken);
        console.log('register idToken is '+data.idToken);
        this.auth.canAuthenticate();

      },
      error:data=>{
        if(data.error.error.message=="INVALID_EMAIL"){

          this.errorMessage="Invalid Email!";

        } else if(data.error.error.message=="EMAIL_EXISTS"){

          this.errorMessage = " Already Email Exists!";

        }else{
          this.errorMessage="Unknown error occured when creating this accounts!";
        }
      }
    }).add(()=>{
       this.loading=false;
       console.log('register completed');
    })
 


  }

}
