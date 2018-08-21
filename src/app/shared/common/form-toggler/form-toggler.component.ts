import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { MemberService } from '../../../shared/services/member.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs/Observable'

export const enum HTTPmethod {
  CREATE,
  UPDATE,
  DELETE,
  GET
}

declare var $:any

@Component({
  selector: 'app-form-toggler',
  templateUrl: './form-toggler.component.html',
  styleUrls: ['./form-toggler.component.css']
})
export class FormTogglerComponent implements OnInit {

  private apiUrl:String = "http://18.221.203.247/api"
  @Input() verifyValue:boolean = false
  @Input() label:string
  @Input() value:string
  @Input() actionLabel:string = "edit"
  @Input() fields:Object
  @Output() onSave: EventEmitter<any> = new EventEmitter()
  @Input() endpoint:string;
  @Input() name:string;
  headers = new HttpHeaders();
  private options:Object = {};
  

  constructor(private app:AppComponent, private memberService:MemberService, private http?:HttpClient) { }

  ngOnInit() {

    this.headers.set('Authorization', this.app.getAccessToken())
    
  }

  toggleChild(e) {
  	
  

  	$('.form-toggler-content.open-input').prev('.hoverable-row').show()
  	$('.form-toggler-content.open-input').hide()

  	var row = $(e.target).parent('.hoverable-row')
  	row.next('.form-toggler-content').show().addClass('open-input')
  	row.hide()
  	e.preventDefault()
  }

  close(e) { 
  	var content = $(e.target).closest('.form-toggler-content')
  	content.hide().removeClass('open-input')
  	content.prev('.hoverable-row').show()
  }

  save() {
    this.sendUpdate(this.value, this.endpoint).subscribe(res=>this.onSuccess(res));
  }

  onSuccess(res:any){
    console.log(res);
  }

  private sendUpdate(value:string, endPoint:string):Observable<any> {
    var key:Object = {};

    this.options["headers"] = this.headers;   

    key[this.name] = value;
    return this.http.put(this.apiUrl + endPoint, key, this.options);
  }



}
