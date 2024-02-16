import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HTTPService, carTypeObj } from '../http.service';

@Component({
  selector: 'app-cart-info',
  templateUrl: './cart-info.component.html',
  styleUrls: ['./cart-info.component.css']
})
export class CartInfoComponent implements OnInit {
  bage = 1;
  cart_info:carTypeObj[]=[];
  show = false;
  total = 0;
  x=1;

  constructor(private serv: HTTPService) { 
    
  }

  ngOnInit(): void {
    console.log('entre aqui');
    this.serv.get_length().subscribe(resp =>console.log(resp))
    this.serv.get_total().subscribe(resp => console.log(resp))
    //  this.serv.get_length().subscribe(
    //   resp =>{ 
    //     let aux:any = resp;
    //     this.bage = aux;
    //     console.log('bage',this.bage);
    //   }
    //  );
    //  this.serv.get_cart().subscribe(resp => {
    //   this.cart_info = resp;
    //  });
    //  this.serv.get_total().subscribe(resp => {
    //   this.total = resp;
    //  })

  }
  delete_producto(producto:String){
    this.serv.delete_product(producto);
  }
  change_cant(operation:number,producto:carTypeObj){
    if(operation == -1 && producto.cant == 1)return;
    this.serv.change_cant(operation,producto);
  }
  go_to_payment(){
    // this.router.navigateByUrl('payment');
  }

}
