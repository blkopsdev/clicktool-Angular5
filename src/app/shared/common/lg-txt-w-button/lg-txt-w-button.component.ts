import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lg-txt-w-button',
  templateUrl: './lg-txt-w-button.component.html',
  styleUrls: ['./lg-txt-w-button.component.css']
})
export class LgTxtWButtonComponent implements OnInit {

  @Input() title:string	
  @Input() bodyText:string	
  @Input() subText:string	

  constructor() { }

  ngOnInit() {
  }

}
