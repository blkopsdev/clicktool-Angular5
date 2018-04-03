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

  nextStepUrl:string = "/signup/identification"
  previousUrl:string = "/signup/account"

  constructor(private util:Util, private router:Router) { }

  ngOnInit() {
  	this.user = this.util.getLocalObject("user") as User
    console.log(this.user)
  }

  ngOnDestroy() {

    if( this.router.url == this.nextStepUrl || this.router.url == this.previousUrl ) { }else{
      this.util.deleteLocalObject("user");
    }     
  }

  moreThenTwelve() {
  	this.user.isContributionMoreThenTwelve = true
    this.user.isContributionUsd = false
    this.util.setLocalObject("user", this.user)
  	this.router.navigate(['/signup/identification'])
  }

  lessThenTwelve() {
  	this.user.isContributionMoreThenTwelve = false
    this.user.isContributionUsd = false
    this.util.setLocalObject("user", this.user)
  	this.router.navigate(['/signup/identification'])
  }

  usdCurrency() {
  	this.user.isContributionUsd = true
    this.user.isContributionMoreThenTwelve = false
    this.util.setLocalObject("user", this.user)
  	this.router.navigate(['/signup/identification'])
  }

}
