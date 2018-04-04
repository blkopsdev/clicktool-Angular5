import { Component, OnInit } from '@angular/core';
import { MemberService } from '../shared/services/member.service'

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  email:string

  constructor(private memberService:MemberService) { }

  ngOnInit() {
  }

  reset() {
    this.memberService.resetPassword(this.email).subscribe(res => this.afterResetPassword(res))	
  }

  afterResetPassword(res:any) {
    console.log('CHECK EMAILs')
    console.log(res);
  }

}
