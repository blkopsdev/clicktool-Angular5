import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { MemberService } from '../../../shared/services/member.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs/Observable'

export class FormField {
      label:string
      name:string
      value:any
      endpoint:string
      type?:string 
}

export const enum DataTypes {
  STRING,
  NUMBER,
  BOOLEAN
}

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

  private apiUrl:String = "https://icoapi.clicktool.com/api"
  @Input() verifyValue:boolean = false
  @Input() label:string
  @Input() value:any
  @Input() actionLabel:string = "edit"
  @Input() fields:Object
  @Output() onSuccess: EventEmitter<any> = new EventEmitter()
  @Input() endpoint:string;
  @Input() name:string;
  @Input() type:string;
  @ViewChild("saveBtn") saveBtn:ElementRef;
  @ViewChild("openBtn") openBtn:ElementRef;
  headers = new HttpHeaders();
  private isSuccessfull:boolean;
  private options:Object = {};
  private isChecked:boolean = false;

  constructor(private app:AppComponent, private memberService:MemberService, private http?:HttpClient) { }

  ngOnInit() {
    
   

    if(this.type == "boolean") {
      this.isChecked = this.value;
    }

    this.headers.set('Authorization', this.app.getAccessToken());    
  }

  toggleChild(e) {

  	$('.form-toggler-content.open-input').prev('.hoverable-row').show()
  	$('.form-toggler-content.open-input').hide()

  	var row = $(this.openBtn.nativeElement).parent('.hoverable-row')
  	row.next('.form-toggler-content').show().addClass('open-input')
  	row.hide()

  	e.preventDefault()
  }

  close() { 
  	var content = $(this.saveBtn.nativeElement).closest('.form-toggler-content')
  	content.hide().removeClass('open-input')
  	content.prev('.hoverable-row').show()
  }

  save() {
    this.sendUpdate(this.value, this.endpoint).subscribe(res=>this.httpResponse(res));
  }

  updateValue(event: any) {
    
    

    if(this.type == "string" || this.type == "number") {
      this.value = (<HTMLInputElement>event.target).value;
    }

    if(this.type == "boolean") {
      this.value = !this.value;
    }

    
  }

  httpResponse(res:any){
    this.onSuccess.emit(res);
    this.isSuccessfull = true;
    this.close();
  }

  private sendUpdate(value:string, endPoint:string):Observable<any> {
    var _endpoint:string  = this.apiUrl + endPoint;
    if(this.app.isLoggedIn()){
      _endpoint = _endpoint + "?access_token=" + this.app.getAccessToken();
    }
    var key:Object = {};
    this.options["headers"] = this.headers;   
    key[this.name] = value;
    return this.http.patch(_endpoint, key, this.options);
  }

}














export class Form {

  private fields:FormField[] = []
  globalEndpoint:string = "";
  jsonResponse:Object = {}


  addField(label:string, name:string, value:any, endpoint?:string) {

    this.fields.push({
      "label":label,
      "name":name,
      "value":value,
      "endpoint":endpoint || this.globalEndpoint
    })


    this.buildFormFromJSON(this.fields, this.jsonResponse)

  }

  getFields():FormField[] {
    return this.fields;
  }


  private buildFormFromJSON(fields:FormField[], resObject:Object) {
      fields.filter($field => {
        for(var resObjKey in resObject) {
         this.addFormValueType($field.name, resObjKey, $field)
        }
      });

  }

  private addFormValueType(key:string, resObjKey:string, obj:FormField):FormField[] {
    var fields:FormField[] = []
    if(key == resObjKey) {
      var type = (typeof obj.value);
      obj["type"] = type;
      fields.push(obj)
    }
    return fields;
  }

}















