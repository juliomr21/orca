
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { ProdutsPageComponent } from './pages/produts-page/produts-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';



@NgModule({
  declarations: [
    ProdutsPageComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    FormsModule,
    SharedModule
    
  ],
  exports: [ProdutsPageComponent]
})
export class StoreModule { }
