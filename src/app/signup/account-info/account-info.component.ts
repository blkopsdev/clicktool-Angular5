import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../shared/models/user'
import { Util } from '../../shared/util/util'
import { Router } from '@angular/router'
import { MemberService } from '../../shared/services/member.service'

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
  showPassword:boolean = false;
  countryCode:string
  @ViewChild('passwordField') passwordField:ElementRef;
  @ViewChild('passwordConfirmField') passwordConfirmField:ElementRef;
  doPasswordsMatch:boolean = true;


  constructor(private util:Util, private router:Router, private formBuilder: FormBuilder, private memberService:MemberService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      firstname:[null, Validators.required],
      lastname:[null, Validators.required],
      dob:[null, Validators.required],
      email:[null, Validators.email],
      phone:[null, Validators.required],
      country:[null, Validators.required],
      // publicWalletAddress:[null, Validators.required],
      company:[null, Validators.required],
      password:[null, Validators.required],
      passwordConfirm:[null, Validators.required]
    })

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

    this.form.updateValueAndValidity();

    console.log(this.form.valid);

    if(this.form.valid){
      if(this.user.password != this.user.passwordConfirm){ this.doPasswordsMatch = false; } 
      this.memberService.createAccount(this.user).subscribe(res=>this.afterCreateAccount(res))
      this.util.setLocalObject("user", this.user)
    }else{
       Object.keys(this.form.controls).filter($0 => {
        this.form.get($0).markAsTouched({ onlySelf: true })
      })     
    }  

  }


  afterCreateAccount(res:Response) {
    this.memberService.afterCreateAccount(this.user.email, this.user.password)
    .subscribe(session => this.afterLogin(session))
  }


  afterLogin(session:Response) {
    this.memberService.saveAccessToken(session)
    this.memberService.setLocalMemberObj(session)


    if(!session["user"]["isShuftiproVerified"]){
      this.router.navigate(['/verify'])
    }else{
      this.memberService.afterLoginRoute()
    }
  }


  changeInputType() {
    if(this.showPassword) {
      this.passwordField.nativeElement.setAttribute('type','password'); 
      this.passwordConfirmField.nativeElement.setAttribute('type','password'); 
      // Hide Password
      this.showPassword = false
    }else{
      this.passwordField.nativeElement.setAttribute('type','text');      
      this.passwordConfirmField.nativeElement.setAttribute('type','text');      
      // Show Password
      this.showPassword = true
    }
  }

}
