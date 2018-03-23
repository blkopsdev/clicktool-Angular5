import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../shared/models/user'
import { Util } from '../../shared/util/util'

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.css'],
  providers:[Util]
})
export class AgreementsComponent implements OnInit, OnDestroy {

  private user:User = new User()

  constructor(private util:Util) { }

  ngOnInit() {
  	this.user = this.util.getLocalObject("user") as User
  }
  
  ngOnDestroy() {
  	this.util.setLocalObject("user", this.user)
  }





}
