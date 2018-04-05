import { Component, OnInit } from '@angular/core';
import { MemberService } from '../shared/services/member.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  email:string

  constructor(private memberService:MemberService, private router:Router) { }

  ngOnInit() {
  }

  reset() {
    this.memberService.resetPassword(this.email).subscribe(res => this.afterResetPassword(res))	
  }

  afterResetPassword(res:any) {
    this.router.navigate(['/password/reset/checkemail', { title: 'Please check your email', subTitle: 'Please check your email '+ this.email +' for a link to reset your password', actionRouter:'/login', buttonLabel: 'Sign In'} ]);
  }

}
