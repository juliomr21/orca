import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../http.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {

  constructor(private serv:HTTPService) { }

  ngOnInit(): void {
    
    
  }

}
