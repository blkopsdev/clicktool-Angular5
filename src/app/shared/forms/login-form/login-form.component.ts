import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service'
import { User } from '../../models/user' 

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [MemberService]
})
export class LoginFormComponent implements OnInit {

  user:User = new User()

  constructor(private memberService:MemberService) { }

  ngOnInit() {
  	
  }

  login() {
  	this.memberService.login(this.user.email, this.user.password).subscribe(res=>this.memberService.afterLogin(res))
  }

}
