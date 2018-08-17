import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
export class AccountInfoComponent implements OnInit, OnDestroy, AfterViewInit {
  
  private user:User = new User()
  nextStepUrl:string = "/signup/contribution"
  form: FormGroup;
  showPassword:boolean = false;
  countryCode:string
  @ViewChild('passwordField') passwordField:ElementRef;
  @ViewChild('passwordConfirmField') passwordConfirmField:ElementRef;
  doPasswordsMatch:boolean = true;
  isPreloaderHidden:boolean = true;
  isLoading:boolean = false;


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

  	//this.user = this.util.getLocalObject("user") as User
 
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    if( this.router.url == this.nextStepUrl || this.router.url == '/signup' ) { }else{
      this.util.deleteLocalObject("user");
    }    
  }


  goToNext() {

     

    this.form.updateValueAndValidity();

    if(this.form.valid){

      this.isPreloaderHidden = false;
      this.isLoading = true;

        this.memberService.createAccount(this.user, (err)=>{
          this.isPreloaderHidden = true;
          this.isLoading = false;
        }).subscribe(res=>this.afterCreateAccount(res))

    }else{
       Object.keys(this.form.controls).filter($0 => {
        this.form.get($0).markAsTouched({ onlySelf: true })
      })     
    }  

  }

  onError(res:any) {
    console.log(res);
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
