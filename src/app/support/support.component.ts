import { Component, OnInit } from '@angular/core';
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
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  support_types = [
    {id: 1, name: "Clicktool"},
    {id: 2, name: "Wallet"}
  ];

  form: FormGroup;
  submitForm: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;

  selected_type: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      support_type: ["", [Validators.required]]
    });
    this.submitForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ["", [Validators.required]],
      subject: ["", [Validators.required]],
      message: ["", [Validators.required]]
    });
  }
  
  panelOpenState: boolean = false;

  get name() { return this.submitForm.get('name'); }
  get email() { return this.submitForm.get('email'); }
  get subject() { return this.submitForm.get('subject'); }
  get message() { return this.submitForm.get('message'); }

 /**
  * Process the form we have. Send to whatever backend
  * Only alerting for now
  */
  processForm() {
    console.log(this.selected_type);

    this.result = this.submitForm.value;
    console.log(this.result);
    debugger;
    this.isSubmitted = true;
    if (!this.submitForm.valid)
      return;
    console.log(this.selected_type);
    const allInfo = `My name is ${this.name}. My email is ${this.email}. My subject is ${this.subject}. My message is ${this.message}`;
    console.log(allInfo);
    
  }

}
