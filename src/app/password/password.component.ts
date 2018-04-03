import { Component, OnInit } from '@angular/core';
import { MemberService } from '../shared/services/member.service'
import { AppComponent } from '../app.component'
import { User } from '../shared/models/user'
import { Response } from '@angular/http'

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers: [MemberService]
})
export class PasswordComponent implements OnInit {

  constructor(private memberService:MemberService, private app:AppComponent) { }

  currentPassword:string
  newPassword:string
  confirmNewPassword:string

  ngOnInit() {
  	//this.memberService.findMemberById(this.app.getUserId()).subscribe()
  }

  afterUpdateAccount(currentPassword:string, newPassword:string) {
  	if(this.confirmNewPassword != newPassword){return alert('Confirm password dont match') }
  	this.memberService.resetPassword(currentPassword, newPassword).subscribe(res => this.afterUpdatePassword(res))
  }

  afterUpdatePassword(res:Response) {
  	alert('Password updated successfully');
  }

}
