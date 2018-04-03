import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service'
import { User } from '../../models/user' 

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [MemberService]
})
export class LoginFormComponent implements OnInit {

  user:User = new User()
  form: FormGroup;

  constructor(private memberService:MemberService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  	
    this.form = this.formBuilder.group({
      email:[null, Validators.required],
      password:[null, Validators.required]
    })

  }

  login() {
    this.form.updateValueAndValidity();
    if(this.form.valid){
      this.memberService.login(this.user.email, this.user.password).subscribe(res=>this.memberService.afterLogin(res))
    }else{
      Object.keys(this.form.controls).filter($0 => {
        this.form.get($0).markAsTouched({ onlySelf: true })
      })
    }
  	
  }

}
