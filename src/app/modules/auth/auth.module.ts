import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule} from '@angular/forms';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [ CreatePageComponent, LoginPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
    
  ],
  exports:[LoginPageComponent]
})
export class AuthModule { }
