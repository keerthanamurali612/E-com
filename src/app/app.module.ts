import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { RouterModule ,Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';


const routes:Routes =[
  {path:'',component:HeaderComponent},
  {path:'products' ,component:ProductsComponent},
  {path:'cart',component:CartComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
