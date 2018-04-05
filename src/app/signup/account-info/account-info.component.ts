import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../shared/models/user'
import { Util } from '../../shared/util/util'
import { Router } from '@angular/router'

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

declare var $:any

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
  providers: [Util]
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  
  private user:User = new User()
  nextStepUrl:string = "/signup/contribution"
  form: FormGroup;

  constructor(private util:Util, private router:Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      firstname:[null, Validators.required],
      lastname:[null, Validators.required],
      dob:[null, Validators.required],
      email:[null, Validators.required],
      phone:[null, Validators.required],
      country:[null, Validators.required],
      publicWalletAddress:[null, Validators.required],
      company:[null, Validators.required],
      password:[null, Validators.required],
      passwordConfirm:[null, Validators.required]
    })

    $( ".datepicker" ).datepicker({
      onSelect: (date) => {
        this.user.dob = date;
        this.onSelectDate()
      }
    });
  	this.user = this.util.getLocalObject("user") as User
  }

  ngOnDestroy() {
    if( this.router.url == this.nextStepUrl || this.router.url == '/signup' ) { }else{
      this.util.deleteLocalObject("user");
    }    
  }

  onSelectDate() {
     this.form.controls["dob"].setErrors(null)
  }

  goToNext() {
    console.log(this.user)
    this.form.updateValueAndValidity();

    if(this.form.valid){
      if(this.user.password != this.user.passwordConfirm){ return alert("Passwords don't match") }
      this.util.setLocalObject("user", this.user)
      this.router.navigate([this.nextStepUrl])
    }else{
       Object.keys(this.form.controls).filter($0 => {
        this.form.get($0).markAsTouched({ onlySelf: true })
      })     
    }  

  }



}
