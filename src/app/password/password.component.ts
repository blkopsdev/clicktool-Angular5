import { Component, OnInit } from '@angular/core';
import { MemberService } from '../shared/services/member.service'
import { AppComponent } from '../app.component'
import { User } from '../shared/models/user'
import { Response } from '@angular/http'
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers: [MemberService]
})
export class PasswordComponent implements OnInit {

  constructor(private memberService:MemberService, private app:AppComponent, private activatedRoute: ActivatedRoute) { }

  currentPassword:string
  newPassword:string
  confirmNewPassword:string
  private subscription: Subscription
  userId:string
  user:User = new User()

  ngOnInit() {
    //subscribe to router event 
    this.subscription = this.activatedRoute.params
      .subscribe(
          (param: any) => {
        this.userId = param['id'];  
        this.memberService.findMemberById(this.app.getUserId() as string).subscribe(res => this.afterGetUser(res))
      })
  }

  afterUpdateAccount(currentPassword:string, newPassword:string) {
  	if(this.confirmNewPassword != newPassword){return alert('Confirm password dont match') }
    delete this.user.passwordConfirm
    //this.memberService.updateAccountBtId(this.userId, this.user).subscribe(res => this.afterUpdatePassword(res));
  	this.memberService.changePassword(currentPassword, newPassword).subscribe(res => this.afterUpdatePassword(res))
  }

  afterGetUser(res:User) {
    this.user = res;
  }

  afterUpdatePassword(res:Response) {
  	alert('Password updated successfully');
  }

}
