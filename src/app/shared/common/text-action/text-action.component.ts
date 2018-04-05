import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../../app.component'

@Component({
  selector: 'app-text-action',
  templateUrl: './text-action.component.html',
  styleUrls: ['./text-action.component.css']
})
export class TextActionComponent implements OnInit {
  
  private subscription: Subscription

  constructor(private activatedRoute: ActivatedRoute, private app:AppComponent) { }

  title:string
  actionRouter:string
  buttonLabel:string
  subTitle:string

  ngOnInit() {
    //subscribe to router event 
    this.subscription = this.activatedRoute.params
      .subscribe(
          (param: any) => {
            let title = param['title']; 
            let actionRouter = param['actionRouter'];
            let buttonLabel = param['buttonLabel'];
            let subTitle = param['subTitle'];

            this.buttonLabel = buttonLabel
			this.title = title
			this.actionRouter = actionRouter
			this.subTitle = subTitle
    })  	
  }

}
