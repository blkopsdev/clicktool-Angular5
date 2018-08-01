import { Component, OnInit, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {
  
  form: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

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
    
    let body ='meta_web_form_id=1865666917&meta_split_id=&listname=awlist4934147&redirect=https%3A%2F%2Fwww.aweber.com%2Fthankyou-coi.htm%3Fm%3Dtext&meta_adtracking=My_Web_Form&meta_message=1&meta_required=name%2Cemail&meta_tooltip=&name=' + this.result.name + '&email=' + this.result.email + '&submit.x=59&submit.y=31';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html,application/xhtml+xml,application/xml,application/json;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-auth'
      })
    };
    return this.http.post('https://www.aweber.com/scripts/addlead.pl', body, httpOptions).subscribe(res => { console.log(res) })
  }

  reset() {
    this.isSubmitted = false;
    this.form.reset();
  }

}
