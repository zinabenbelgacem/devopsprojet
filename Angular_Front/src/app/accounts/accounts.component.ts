import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {


  accounts : any ;

  constructor( private http : HttpClient){

  }
  ngOnInit(){

    this.http.get("http://localhost:8888/ACCOUNT-SERVICE/accounts").subscribe({
      next : data => {
        this.accounts = data;
      },
      error : err =>{
        console.log(err);
      }
    })
  }

}
