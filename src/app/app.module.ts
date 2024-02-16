import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProductosComponent } from './productos/productos.component';
import { CornerImagesComponent } from './corner-images/corner-images.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FootComponent } from './foot/foot.component';
import { InfoUserComponent } from './info-user/info-user.component';
import { CartInfoComponent } from './cart-info/cart-info.component';





const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [	
    AppComponent, ProductosComponent, CornerImagesComponent, NavBarComponent, FootComponent, InfoUserComponent, CartInfoComponent
      
   ],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot(maskConfig),
    CurrencyMaskModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
