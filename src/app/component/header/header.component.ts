import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  public totalItem :number =0;
  public searchTerm:string='';
  constructor(private cartService :CartService,public auth:AuthService,private router:Router) {}
  user={localId:"someID",displayName:"somename"};
   

  ngOnInit():void{

    this.auth.canAccess();
    if(this.auth.isAuthenticated ()){

      //call user details service
      this.auth.detail().subscribe({
        next:data=>{
          this.user.localId=data.users[0].localId;
          this.user.displayName=data.users[0].displayName;
        }
      })

    }

    this.cartService.getProducts()
    .subscribe(res =>{
      this.totalItem =res.length;
    })
  }

  logout(){
    //remove token
    this.auth.removeToken();
    this.auth.canAccess();
    console.log('logout');
    
  }

  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);

    }





}
