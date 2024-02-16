import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/components/home/home.component';
import { CornerImagesComponent } from './corner-images/corner-images.component';
import { InfoUserComponent } from './info-user/info-user.component';
import { CartInfoComponent } from './cart-info/cart-info.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'app-corner-images',
    component: CornerImagesComponent
  },
  {
    path: 'payment',
    component: InfoUserComponent
  },
  {path:'mmm',
component:CartInfoComponent},
  
  {
    path: 'auth',
    loadChildren: () => import(`./modules/auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: 'store',
    loadChildren: () => import('./modules/store/store.module').then (m =>m.StoreModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
