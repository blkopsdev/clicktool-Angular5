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

  name: string;
  email: string;
  subject: string;
  message: string;
  selected_type: string;
  constructor() {
    this.form = new FormGroup({
      support_type: new FormControl(null)
    })
  }

  ngOnInit() {
  }
  
  panelOpenState: boolean = false;
  
 /**
  * Process the form we have. Send to whatever backend
  * Only alerting for now
  */
  processForm() {
    console.log(this.selected_type);
    const allInfo = `My name is ${this.name}. My email is ${this.email}. My subject is ${this.subject}. My message is ${this.message}`;
    
  }

}
