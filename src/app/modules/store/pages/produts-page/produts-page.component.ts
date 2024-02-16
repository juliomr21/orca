import { Component, HostListener, OnInit } from '@angular/core';
import { HTTPService } from '../../../../http.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-produts-page',
  templateUrl: './produts-page.component.html',
  styleUrls: ['./produts-page.component.css']
})
export class ProdutsPageComponent implements OnInit {

  urlApi = 'https://dummyjson.com/';
  list_products: any[] = [];
  list_products_show: any[] = [];
  list_category: string[] = [];
  list_marca: string[] = [];
  list_filterCategory: string[] = [];
  list_filterMarca: string[] = [];
  order_option: any
  category: any;
  itemsPerPage = 5;  // Número de elementos por página
  currentPage = 1;   // Página actual
  categoriesView = true;
  precieView = true;
  marcaView = true;
  orderView = true;
  allBrand = true;
  allCategories = false;
  filterInit = false;
  priceMin = 0;
  priceMax = 2000;
  constructor(private http_serv: HTTPService, private router: Router, private act_router: ActivatedRoute) { }

  ngOnInit(): void {
    let url = this.urlApi + 'products?limit=100';
    let urlCategory = this.urlApi + 'products/categories';
    this.act_router.params.subscribe(param => {
      let paramResp: any = param;
      this.category = paramResp.category;
      this.http_serv.get(url).subscribe(resp => {
        let list: any = resp;
        this.list_products = list.products;
        this.filterData(this.category);
      });
    });

    this.http_serv.get(urlCategory).subscribe(resp => {
      let respCategory: any = resp;
      this.list_category = this.list_category.concat(respCategory);

    });


  }

  filterData(category: string) {
    if (category == 'all') {
      this.list_products_show = this.list_products.filter(producto => (producto.price >= this.priceMin && producto.price <= this.priceMax));
      this.list_filterCategory = this.list_category;
      this.allCategories = true;
      this.fill_List_Marca();
    }
    else {
      this.list_filterCategory.push(category);
      this.fill_List_Marca();
      this.filter();

    }
    this.filterInit = true;
  }
  fill_List_Marca() {
    // this.list_marca = [];
    for (let producto of this.list_products) {
      for (let category of this.list_filterCategory) {
        if (producto.category == category) {

          if (this.list_marca.lastIndexOf(producto.brand) == -1) {
            this.list_marca.push(producto.brand);
            this.list_filterMarca.push(producto.brand);
          }

        }
      }
      // this.list_filterMarca = this.list_marca;
    }

  }
  delete_list_marca(category: string) {
    // this.list_marca = [];
    this.list_filterMarca = [];
    let list_aux = this.list_products.filter(item => item.category == category);
    
    this.list_products_show = this.list_products_show.filter((producto) => {
      if(producto.category != category)
      {
       if(this.list_filterMarca.indexOf(producto.brand) == -1)
        this.list_filterMarca.push(producto.brand)
      return true;
      }return false;
      });

    this.list_marca = this.list_marca.filter((item) =>{
      for(let it of list_aux){
        if(item == it.brand)return false;
      }
      return true;
    } )
    // this.list_marca = this.list_filterMarca.filter(() =>{
    //   for(let it of list_aux){
    //     if(this.list_filterMarca.indexOf(it.brand) != -1)return false;
    //   }
    //   return true;
    // } )
    // this.list_products_show = this.list_products_show.filter(item => {
    //   if (item.category != category) {
    //     if (this.list_marca.lastIndexOf(item.brand) == -1) {
    //       this.list_marca.push(item.brand);

    //     }
    //     if (this.list_filterMarca.indexOf(item.brand) != -1)
    //       return true;
    //     else
    //       return false;
    //   }
    //   return false;
    // }
    // );
    // this.list_filterMarca = this.list_filterMarca.filter(item => this.list_marca.indexOf(item) != -1);

  }
  first_filter() {
    this.filter();
  }
  filter() {
    this.list_products_show = this.list_products.filter(item => {
      for (let brand of this.list_filterMarca) {
        if (brand == item.brand && item.price >= this.priceMin && item.price <= this.priceMax && this.list_filterCategory.indexOf(item.category) != -1) {
          return true;
        }

      }
      return false;
    });

  }
  actualizaCategory(category: string) {
    if (category == 'All') {
      this.category = '';
      this.allCategories = !this.allCategories
      if (this.allCategories) {
        this.list_filterCategory = this.list_category;
        this.allBrand = true;
        this.list_marca = [];
        this.list_filterMarca = [];
        this.filterData('all');

      }
      else {
        this.list_filterCategory = [];
        this.list_filterMarca = [];
        this.list_marca = [];
        this.list_products_show = [];
      }
      return;

    }
    let pos = this.list_filterCategory.indexOf(category);
    if (pos == -1) {
      this.list_filterCategory.push(category);
      // this.fill_List_Marca();
      // this.first_filter();
      this.add_marca(category);
    }
    else {
      this.list_filterCategory = this.list_filterCategory.filter(item => item != category);
      this.delete_list_marca(category);
    }
  }
  add_marca(category: string) {
    let aux_list = this.list_products.filter(item => item.category == category);
    for (let it of aux_list) {
      this.list_products_show.push(it);
      if (this.list_marca.indexOf(it.brand) == -1) {
        this.list_marca.push(it.brand);
        this.list_filterMarca.push(it.brand);
      }
    }
  }

  actualizaMarca(marca: string) {
    if (marca == 'All') {
      this.allBrand = !this.allBrand;
      if (this.allBrand) {
        this.fill_List_Marca();
        this.list_filterMarca = this.list_marca;
      }
      else {
        this.list_filterMarca = [];
      }
      this.first_filter();
      return;

    }
    // if(this.allBrand)
    // {
    //   this.allBrand = false;
    //   this.list_filterMarca = [];
    // }

    let pos = this.list_filterMarca.indexOf(marca);

    if (pos == -1)
      this.list_filterMarca.push(marca);
    else
      this.list_filterMarca = this.list_filterMarca.filter(item => item != marca);

    this.first_filter();
  }
  detail_product(id: any) {
    let url = `store/products/detail/${id}`;
    this.scrollToTop()
    this.router.navigate([url]);

  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  Lower_price(a: any, b: any): number {

    if (a.price < b.price) {
      return -1;
    } else if (a.price > b.price) {
      return 1;
    } else {
      return 0;
    }
  }
  Higher_price(a: any, b: any): number {

    if (b.price < a.price) {
      return -1;
    } else if (b.price > a.price) {
      return 1;
    } else {
      return 0;
    }
  }
  relevance_product(a: any, b: any): number {
    if (b.rating < a.rating) {
      return -1;
    } else if (b.rating > a.rating) {
      return 1;
    } else {
      return 0;
    }
  }
  change_order(order: string) {
    this.order_option = order
    if (this.order_option == 'Lower price')
      this.list_products_show.sort(this.Lower_price)
    if (this.order_option == 'Relevance')
      this.list_products_show.sort(this.relevance_product)
    if (this.order_option == 'Higher price')
      this.list_products_show.sort(this.Higher_price)

  }
  // change_category() {
  //   this.filterData(this.category);
  // }
  // check_cat(val: string) {
  //   // this.actualizaCategory(val);
  // }


}
