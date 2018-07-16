import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../shared/services/member.service'
import { AppComponent } from '../../../app.component'

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css'],
  providers: [AppComponent]
})
export class DashboardNavComponent implements OnInit {

  constructor(private app:AppComponent, private memberSerivce:MemberService) { }

  ngOnInit() {
  	
  }

  logout(e) {
 	  this.memberSerivce.logout( this.app.getAccessToken() ).subscribe(res => this.memberSerivce.afterLogout())
 	  e.preventDefault();
  }

}
