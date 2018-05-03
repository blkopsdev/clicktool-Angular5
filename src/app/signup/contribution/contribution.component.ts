import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../shared/models/user'
import { Util } from '../../shared/util/util'
import { Router } from '@angular/router'
import { MemberService } from '../../shared/services/member.service'

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

  constructor(private util:Util, private router:Router, private memberService:MemberService) { }

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
    // Identification
  	this.router.navigate(['/signup/identification'])
  }

  lessThenTwelve() {
  	this.user.isContributionMoreThenTwelve = false
    this.user.isContributionUsd = false
    this.util.setLocalObject("user", this.user)
    // Go straight to dashboard and create account
    this.memberService.createAccount(this.user).subscribe(res=>this.afterCreateAccount(res))
  }

  usdCurrency() {
  	this.user.isContributionUsd = true
    this.user.isContributionMoreThenTwelve = false
    this.util.setLocalObject("user", this.user)
    this.memberService.createAccount(this.user).subscribe(res=>this.afterCreateAccount(res))
  }

  afterCreateAccount(res:Response) {
    this.memberService.afterCreateAccount(this.user.email, this.user.password)
    .subscribe(session => this.afterLogin(session))
  }

  afterLogin(session:Response) {
    this.memberService.saveAccessToken(session)
    this.memberService.setLocalMemberObj(session)

    console.log("comppp: ", this.user.isContributionUsd)
    if(this.user.isContributionUsd){
      this.router.navigate(['/signup/wire'])
    }else{
      this.memberService.afterLoginRoute()
    }
  }





}
