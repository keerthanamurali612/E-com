import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router:Router,private http:HttpClient) { }

  isAuthenticated():boolean{
    if(sessionStorage.getItem('token')!==null){
      return true;
    }
    return false;
  }

  canAccess(){
    if (!this.isAuthenticated()) {
        //redirect to login
        this.router.navigate(['/login']);
    }
  }
 
  canAuthenticate(){
    if (this.isAuthenticated()) {
      //redirect to products
      this.router.navigate(['/products']);
    }
  }

  //api request to user register

  register(name:string,email:string,password:string){
    //send data to register api(firebase)
      return this.http.
      post<{idToken:string}>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcLIZHX4p-qliEx8BKya4EOWURPppkVic',
     {displayName:name,email,password}
    );

  } 

  storeToken(token:string){
    sessionStorage.setItem('token',token);
  }

     //api request to user login

  login( email:string,password:string){

  //send data to login api(firebase)
   return this.http.
  post<{idToken:string}>(
    '  https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcLIZHX4p-qliEx8BKya4EOWURPppkVic',
    {email,password}
  );

  }

  detail(){
    let token=sessionStorage.getItem('token');

    return this.http.post<{users:Array<{localId:string,displayName:string}>}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCcLIZHX4p-qliEx8BKya4EOWURPppkVic',
      {idToken:token}
    );
  }

  removeToken(){
    sessionStorage.getItem('token')
  }
  }



  