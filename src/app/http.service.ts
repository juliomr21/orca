import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, max } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  private cart:carTypeObj[];
  private cart$:Subject<carTypeObj[]>;
  private bage$:Subject<number>;
  private bage:any;
  private total:number;
  private total$:Subject<number>;
  
  constructor(private HTTP:HttpClient) {
    this.cart = [];
    this.cart$= new Subject<carTypeObj[]>();
    this.bage$ = new Subject<number>();
    this.bage = 0;
    this.total = 0;
    this.total$ = new Subject<number>(); 

   }
   get(url:any):Observable<any[]> {
    return this.HTTP.get<any[]>(url);
   }
   post(url:any, data:any){
    return this.HTTP.post(url,data);
   }
   get_cart():Observable<carTypeObj[]>{
    return this.cart$;
   }
   set_cart(producto:carTypeObj){
   
    let pos = this.cart.findIndex(item => item.product == producto.product);
    if(pos == -1)
    {
      this.cart.push(producto);
      this.cart$.next(this.cart);
    }
    else
    {
      this.cart[pos].cant = this.cart[pos].cant + producto.cant;
      this.cart$.next(this.cart)
    }
    
    this.bage = this.cart.length;
    this.bage$.next(this.bage)
    this.total = this.total + producto.value;
    this.total$.next(this.total);
      
   }
   get_size(){
    return this.total;
   }
   get_length():Observable<Number>{
    return this.bage$.asObservable();
   }
   get_total():Observable<number>{
    return this.total$.asObservable();
   }
   delete_product(producto:String){
    this.cart = this.cart.filter((item) => {
      if(item.product != producto)return true;
      this.total = this.total - item.cant * item.value;
      this.total$.next(this.total);
      return false;
      });
    this.cart$.next(this.cart);
    this.bage--;
    this.bage$.next(this.bage);
   }
   change_cant(operation:number,producto:carTypeObj){
    this.cart.map((item) => {
    if(item.product != producto.product)return item;
    let item_temp = item;
    item_temp.cant = item_temp.cant + operation;
    this.total = this.total + (operation * item.value );
    this.total$.next(this.total);
    return item_temp;
   } );

   }
   
}
export interface carTypeObj{
  product:String ;
  cant:number;
  value: number ;
  image:string;
}
