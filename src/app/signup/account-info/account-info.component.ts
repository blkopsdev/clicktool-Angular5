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
  dob_month:string = ""
  dob_day:string = ""
  dob_year:string = ""



  constructor(private util:Util, private router:Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      firstname:[null, Validators.required],
      lastname:[null, Validators.required],
      dob_month:[null, Validators.required],
      dob_day:[null, Validators.required],
      dob_year:[null, Validators.required],
      email:[null, Validators.required],
      phone:[null, Validators.required],
      country:[null, Validators.required],
      publicWalletAddress:[null, Validators.required],
      company:[null, Validators.required],
      password:[null, Validators.required],
      passwordConfirm:[null, Validators.required]
    })

  	this.user = this.util.getLocalObject("user") as User
    this.setBday(this.user)  
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

    this.form.updateValueAndValidity();

    if(this.form.valid){
      if(this.user.password != this.user.passwordConfirm){ return alert("Passwords don't match") }
      this.user.dob = this.getBdayFormmated()
      this.util.setLocalObject("user", this.user)
      this.router.navigate([this.nextStepUrl])
    }else{
       Object.keys(this.form.controls).filter($0 => {
        this.form.get($0).markAsTouched({ onlySelf: true })
      })     
    }  

  }

  getBdayFormmated():string {
    return this.dob_month + "/" + this.dob_day + "/" + this.dob_year;
  }

  setBday(user:User) {
    let bday = this.user.dob.split("/")
    this.dob_month = bday[0]
    this.dob_day = bday[1]
    this.dob_year = bday[2]
  }

}
