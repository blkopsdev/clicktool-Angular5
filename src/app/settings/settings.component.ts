import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AfterViewInit } from '@angular/core';
import { MemberService } from '../shared/services/member.service';
import { FormTogglerComponent, FormField, Form } from '../shared/common/form-toggler/form-toggler.component';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [FormTogglerComponent, Form]
})
export class SettingsComponent implements OnInit {

  fields:FormField[] = [];

  constructor(private app:AppComponent, private memberService:MemberService, private formToggler:FormTogglerComponent, private form:Form) { }

  ngOnInit() {
    this.form.globalEndpoint = "/Members/" + this.app.getUserId();
    this.memberService.findMemberById(this.app.getUserId()).subscribe(res=>this.afterGetMember(res));
  }

  afterGetMember(user:User) {
    this.form.jsonResponse = user;
    this.form.addField("First name", "firstname", user.firstname);
    this.form.addField("Last name", "lastname", user.lastname);
    this.form.addField("Email", "email", user.email);
    this.form.addField("Phone", "phone", user.phone);
    this.form.addField("DOB", "dob", user.dob);
    this.form.addField("Country", "country", user.country);
    this.form.addField("Company", "company", user.company);
    this.form.addField("Whitepaper", "didReadWhitePaper", user.didReadWhitePaper);

    this.fields = this.form.getFields();
  }




}
