import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $:any

@Component({
  selector: 'app-form-toggler',
  templateUrl: './form-toggler.component.html',
  styleUrls: ['./form-toggler.component.css']
})
export class FormTogglerComponent implements OnInit {

  @Input() verifyValue:boolean = false

  @Input() label:string
  @Input() value:string
  @Input() actionLabel:string = "edit"
  @Input() fields:Object
  @Output() onSave: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  	console.log(this.fields)
  }

  toggleChild(e) {
  	var row = $(e.target).parent('.hoverable-row')
  	row.next('.form-toggler-content').show()
  	row.hide()
  	e.preventDefault()
  }

  close(e) { 
  	var content = $(e.target).closest('.form-toggler-content')
  	content.hide()
  	content.prev('.hoverable-row').show()
  }

  save() {
  	this.onSave.emit(this.fields);
  }

}
