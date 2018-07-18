import { Component, OnInit, Input } from '@angular/core';

declare var $:any

@Component({
  selector: 'app-form-toggler',
  templateUrl: './form-toggler.component.html',
  styleUrls: ['./form-toggler.component.css']
})
export class FormTogglerComponent implements OnInit {

  @Input() label:string
  @Input() value:string
  @Input() actionLabel:string = "edit"

  constructor() { }

  ngOnInit() {

  }

  toggleChild(e) {
  	var row = $(e.target).parent('.hoverable-row')
  	row.next('.form-toggler-content').show()
  	row.hide()
  	e.preventDefault()
  }

  close(e) {
  	console.log($(e.target).closest('.form-toggler-content').hide())
  	$(e.target).closest('.form-toggler-content').prev('.hoverable-row').show()

  }

}
