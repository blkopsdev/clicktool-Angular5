import { Component, OnInit } from '@angular/core';
import { MemberService } from '../shared/services/member.service'
import { AppComponent } from '../app.component' 
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

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
  private subscription: Subscription
  token:string

  constructor(private formBuilder: FormBuilder, private memberService:MemberService, private app:AppComponent, private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    //subscribe to router event 
    this.subscription = this.activatedRoute.params
      .subscribe(
          (param: any) => {
          this.token = param['token'];  
      
    });

    this.form = this.formBuilder.group({
      password:[null, Validators.required],
      passwordConfirm:[null, Validators.required],
    })

  }

  updatePassword(password:string, passwordConfirn:string) {
    if(password != passwordConfirn){ alert('Password dont match') }
  	this.form.updateValueAndValidity();
  	Object.keys(this.form.controls).filter($0 => {
  		this.form.get($0).markAsTouched({ onlySelf: true })
  	})
    this.memberService.resetLostPassword(password, this.token).subscribe(res => this.afterResetPassword(res))
  }

  afterResetPassword(res:any) {
    alert('Password reset successfully')
    this.router.navigate(['login'])
  }

}
