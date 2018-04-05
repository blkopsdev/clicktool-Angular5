import { Component, OnInit } from '@angular/core';
import { MemberService } from '../shared/services/member.service'
import { User } from '../shared/models/user'
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:User[]

  constructor(private memberService:MemberService, private app:AppComponent) { }

  ngOnInit() {
  	this.memberService.getAll().subscribe(res=>this.afterGetUsers(res));
  }

  afterGetUsers(res:User[]) {
    console.log(res)
  	this.users = res
  }

}
