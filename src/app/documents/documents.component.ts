import { Component, OnInit } from '@angular/core';
import { MemberService } from '../shared/services/member.service'
import { User } from '../shared/models/user'
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Document } from '../shared/models/document'
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  private subscription: Subscription
  documents:Document = null

  constructor(private activatedRoute: ActivatedRoute, private memberService:MemberService, private app:AppComponent) { }

  ngOnInit() {
    //subscribe to router event 
    this.subscription = this.activatedRoute.params
      .subscribe(
          (param: any) => {
            let userId = param['id'];  
			this.memberService.getMemberDocuments(userId).subscribe(res => this.afterGetDocuments(res))	
    }); 
  }

  afterGetDocuments(res:Document) {
  	this.documents = res;
    console.log(this.documents.Contents)
  }

}
