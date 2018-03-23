import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../shared/models/user'
import { Util } from '../../shared/util/util'
import { Router } from '@angular/router'
import { MemberService } from '../../shared/services/member.service'
import {Response} from '@angular/http'

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css'],
  providers: [Util, MemberService]
})
export class IdentificationComponent implements OnInit {

  private user:User = new User()

  constructor(private util:Util, private router:Router, private memberService:MemberService) { }

  ngOnInit() {
  	this.user = this.util.getLocalObject("user") as User
  }

  signup() {
  	this.memberService.createAccount(this.user).subscribe(res=>this.afterCreateAccount(res))
  }

  afterCreateAccount(res:Response) {
    this.memberService.afterCreateAccount(this.user.email, this.user.password).subscribe(session => this.afterLogin(session))
  }

  afterLogin(res:Response) {  
    this.memberService.afterLogin(res)
  }

}
