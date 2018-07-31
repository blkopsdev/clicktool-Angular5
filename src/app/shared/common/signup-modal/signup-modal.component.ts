import { Component, OnInit, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { toUnicode } from 'punycode';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {
  
  form: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ["", [Validators.required]],
    });
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.form.valid)
      return;
    // Code to save the data
    // userService.Save(this.register.value);
    this.result = this.form.value;
    console.log(this.result);
    /* setTimeout(() => {
      this.result = null;
      this.reset();
    }, 2000); */
  }

  reset() {
    this.isSubmitted = false;
    this.form.reset();
  }

}
