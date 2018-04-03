import { Component, OnInit, OnDestroy, KeyValueDiffer, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
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

  nextStepUrl:string = "/signup/account"

  constructor(private util:Util, private router:Router) { }

  ngOnInit() {
  	this.user = this.util.getLocalObject("user") as User
  }
  
  ngOnDestroy() {
    if(this.router.url != this.nextStepUrl) {
      this.util.deleteLocalObject("user");
    }
  }

  ngDoCheck() {}

  goToNext() {
    this.util.setLocalObject("user", this.user)
    this.router.navigate([this.nextStepUrl])
  }





}
