import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
 products:any = [];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://fakestoreapi.com/products/').subscribe(
     resp => {
      this.products = resp;
      console.log(resp);
    }

    )
  }

}
