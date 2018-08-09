import { Component, OnInit, Input } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})


export class FormInputComponent implements OnInit {
  
  @Input() name:string;
  @Input() formControlName:string;
  @Input() minLength:number;
  @Input() maxlength:number;
  @Input() form: FormGroup;
  @Input() placeholder:string;
  @Input() model:any;

  @Input() requiredMessage:string;
  @Input() minLengthMessage:string;
  @Input() maxlengthMessage:string;

  @Input() placeholderMessage:string;


  constructor() { }

  ngOnInit() {
  }

}
