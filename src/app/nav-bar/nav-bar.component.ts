import { Component, OnInit } from '@angular/core';
import { HTTPService, carTypeObj } from '../http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  bage = 0;
  cart_info:carTypeObj[]=[];
  show = false;
  total = 0;
  x=1;
 
  constructor(private serv:HTTPService,private router: Router) { 
    
  }

  ngOnInit(): void {
     this.serv.get_length().subscribe(
      resp =>{
        let aux:any = resp;
        this.bage = aux;
        console.log(aux);
      }
     );
     this.serv.get_cart().subscribe(resp => {
      this.cart_info = resp;
     });
     this.serv.get_total().subscribe(resp => {
      this.total = resp;
     })

  }
  delete_producto(producto:String){
    this.serv.delete_product(producto);
  }
  change_cant(operation:number,producto:carTypeObj){
    if(operation == -1 && producto.cant == 1)return;
    this.serv.change_cant(operation,producto);
  }
  go_to_payment(){
    this.show = false;
    this.router.navigateByUrl('payment');
  }

}
