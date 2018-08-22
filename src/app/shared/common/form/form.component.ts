import { Component, OnInit, Input } from '@angular/core';

export class FormField {
      label:string
      name:string
      value:string
      endpoint:string 
}


@Component({
  selector: 'app-form-container',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input('title') title:string = "Complete form below";
  @Input('formFields') formFields:FormField[] = [];  

  constructor() { }

  ngOnInit() {
  	
  }

}
