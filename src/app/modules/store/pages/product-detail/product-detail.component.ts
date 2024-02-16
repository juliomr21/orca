import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HTTPService, carTypeObj } from 'src/app/http.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  producto = { id: 0, images: [], thumbnail: '', price: 0, title: '', description: '', category: '' };
  lista_productos_similares:any = [];
  img_principal = '';
  list_img_aux:string[] = [];
  cant = 1;
  constructor(private http_serv: HTTPService, private act_router: ActivatedRoute,private router: Router) { }
  
  // producto:any 
  ngOnInit(): void {
    
      window.scrollTo({ top: 0, behavior: 'smooth' });
    
    this.act_router.params.subscribe(param => {
      let producto_aux: any = param;
      let urlProducto = `https://dummyjson.com/products/${producto_aux.id_producto}`;
      this.http_serv.get(urlProducto).subscribe(resp => {
        let aux: any = resp;
        this.producto = aux;
        this.img_principal = this.producto.thumbnail;
        this.list_img_aux.push(this.img_principal);
        this.list_img_aux = this.list_img_aux.concat(this.producto.images);
        this.http_serv.get(`https://dummyjson.com/products/category/${this.producto.category}?limit=10`).subscribe(
        list_similar => {
          let list_temp:any = list_similar;
          this.lista_productos_similares = list_temp.products;
          }
        );
      });
    });

  }

  scroll(amount: number) {
    let container = document.querySelector('.foto-list-container')!;
    container.scrollLeft += amount;
  }
  detail_product(id:any){
    let url = `store/products/detail/${id}`;
    this.scrollToTop()
    // this.producto = { id: 0, images: [], thumbnail: '', price: 0, title: '', description: '', category: '' };
    this.list_img_aux = [];
    this.router.navigate([url]);
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  actualizar_img(img:string){
    this.img_principal = img;
  }
  add_to_cart(){
    let tempProducto:carTypeObj = {cant:this.cant, product: this.producto.title,value:this.producto.price,image:this.producto.thumbnail};
    this.http_serv.set_cart(tempProducto);
  }
}
