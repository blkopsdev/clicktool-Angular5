import { Component, OnInit } from '@angular/core';

declare var $:any

@Component({
  selector: 'app-button-to-form',
  templateUrl: './button-to-form.component.html',
  styleUrls: ['./button-to-form.component.css']
})
export class ButtonToFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addAction(e) {
  	var parent = $(e.target).closest('.row')
 	parent.next('.button-to-form-add').show()
 	parent.hide()
  }	

}
