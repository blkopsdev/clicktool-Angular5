import { Component, OnInit, OnDestroy, KeyValueDiffer, DoCheck } from '@angular/core';
import { User } from '../../shared/models/user'
import { Util } from '../../shared/util/util'
import { Router } from '@angular/router'

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.css'],
  providers:[Util]
})
export class AgreementsComponent implements OnInit, OnDestroy, DoCheck {

  private user:User = new User()
  differ:any

  constructor(private util:Util, private router:Router) { }

  ngOnInit() {
  	this.user = this.util.getLocalObject("user") as User
  }
  
  ngOnDestroy() {
    
  }

  ngDoCheck() {

  }

  goToNext() {
    this.util.setLocalObject("user", this.user)
    this.router.navigate(['/signup/account'])
  }





}
