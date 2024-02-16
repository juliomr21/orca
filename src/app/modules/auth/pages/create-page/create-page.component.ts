import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  user = '';
  password = '';
  loading = false;
  msg = false;
  constructor(private http_serv:AuthServiceService) { }

  ngOnInit(): void {
  }
  create(){
   let Url = 'users';
   let data = {username:'julio', password:'123',}
   this.http_serv.post(Url,data).subscribe(
    resp => {
      console.log(resp);
    }
   );
  }
}
