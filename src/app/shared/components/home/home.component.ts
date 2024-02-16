import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTPService, carTypeObj } from 'src/app/http.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
   list_original:any = [];
   list_products_show:any = [];
   list_categories:any = [];
  constructor(private http_serv:HTTPService,private router: Router) {}
  ngOnInit() {
    let url = 'https://dummyjson.com/products?limit=90';
    let urlCat = 'https://dummyjson.com/products/categories'
    this.http_serv.get(url).subscribe( {
      next: resp =>{
        this.list_original = resp;
        this.list_products_show = this.list_original.products.filter((item: { rating: number; }) => item.rating > 4.85);
        
      }
     
    })  
    this.http_serv.get(urlCat).subscribe( {
      next: resp =>{
        this.list_categories = resp;
               
      }
     
    })  
      
  }
  
  scroll(amount: number) {
    let container = document.querySelector('.foto-list-container')!;
    container.scrollLeft += amount;
  }
  detail_product(id:any){
    let url = `store/products/detail/${id}`;
    this.router.navigate([url]);
  }
  show_category(category:any){
    let url = `store/products/category/${category}`
    this.router.navigate([url])
  }
  add_cart(){
    let obj:carTypeObj = {cant:2,product:'xxxx',value:5,image:''};
    obj.cant = 2;
    obj.product = 'xxxx';
    obj.value = 5;
    this.http_serv.set_cart(obj);
  }
  add(title:string,price:number,image:string){
    let obj:carTypeObj = {cant:1,product:title,value:price,image:image};
    // obj.cant = 1;
    // obj.product = title;
    // obj.value = price;
    this.http_serv.set_cart(obj)
    // this.http_serv.set_length();
  }
}
