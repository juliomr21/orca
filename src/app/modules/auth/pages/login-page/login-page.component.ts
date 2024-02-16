import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { environment } from 'src/environments/environment';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
 user = '';
 password = '';
 loading = false;
 msg = false;
  constructor(private http_serv:AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  
  }
  login(){
    let Url = 'https://dummyjson.com/auth/login';
    let data_login = { username: this.user, password: this.password}
    this.loading = false;
    this.http_serv.post(Url,data_login).subscribe(
      resp => {
        let token:any = resp;
        localStorage.setItem('token',token.token);
        this.loading = false;
      },
      err =>{
        this.loading = false;
        this.msg = true;
      }
    )
  }
  register(){
    
    this.router.navigate(['auth/register']);
  }

}
