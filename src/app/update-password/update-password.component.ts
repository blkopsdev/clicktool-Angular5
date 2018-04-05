import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  password:string
  passwordConfirm:string
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      password:[null, Validators.required],
      passwordConfirm:[null, Validators.required],
    })

  }

  updatePassword() {
  	this.form.updateValueAndValidity();
  	Object.keys(this.form.controls).filter($0 => {
  		this.form.get($0).markAsTouched({ onlySelf: true })
  	})
  }

  

}
