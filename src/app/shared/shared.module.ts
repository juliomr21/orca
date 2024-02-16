import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { RatingComponent } from './components/rating/rating.component';
import { HomeComponent } from './components/home/home.component';
import { BannerCarouselComponent } from './components/banner-carousel/banner-carousel.component';



@NgModule({
  declarations: [
    RatingComponent,
    HomeComponent,
    BannerCarouselComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
    
  ],
  exports: [
    RatingComponent
  ]
})
export class SharedModule { }
