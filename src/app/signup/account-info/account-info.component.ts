import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../shared/models/user'
import { Util } from '../../shared/util/util'
import { Router } from '@angular/router'

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
  providers: [Util]
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  
  private user:User = new User()

  constructor(private util:Util, private router:Router) { }

  ngOnInit() {
  	this.user = this.util.getLocalObject("user") as User
  }

  ngOnDestroy() {}

  goToNext() {
    this.util.setLocalObject("user", this.user)
    this.router.navigate(['/signup/contribution'])
  }

}
