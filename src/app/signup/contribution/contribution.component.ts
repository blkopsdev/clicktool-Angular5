import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../shared/models/user'
import { Util } from '../../shared/util/util'
import { Router } from '@angular/router'


@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.css'],
  providers: [Util]
})
export class ContributionComponent implements OnInit, OnDestroy {

  private user:User = new User()

  constructor(private util:Util, private router:Router) { }

  ngOnInit() {
  	this.user = this.util.getLocalObject("user") as User
  }

  ngOnDestroy() {
  	this.util.setLocalObject("user", this.user)
  }

  moreThenTwelve() {
  	this.user.isContributionMoreThenTwelve = true
  	this.router.navigate(['/signup/identification'])
  }

  lessThenTwelve() {
  	this.user.isContributionMoreThenTwelve = false
  	this.router.navigate(['/signup/identification'])
  }

  usdCurrency() {
  	this.user.isContributionUsd = true
  	this.router.navigate(['/signup/identification'])
  }

}
