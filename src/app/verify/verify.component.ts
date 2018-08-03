import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '../shared/models/user'
import { Util } from '../shared/util/util'
import { Router } from '@angular/router'
import { MemberService } from '../shared/services/member.service'
import {Response} from '@angular/http'
import { FileSelectDirective, FileDropDirective, FileUploader, FileUploaderOptions, Headers, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { AppComponent } from '../app.component'
import { UploaderComponent } from '../shared/common/uploader/uploader.component'
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
export class Verify {
	document_type:string
	document_id_no:string
	document_expiry_date:string
	address:string
	first_name:string
	last_name:string
	dob:string
	background_checks:string // 1 or 0
	email:string
	phone_number:string
	country:string
	lang:string
	face_image:string
	document_front_image:string
	document_back_image:string
	document_address_image:string
}

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
  providers:[Util]
})
export class VerifyComponent implements OnInit {

  private user:User = new User()
  public uploader:FileUploader = new FileUploader({});
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  uploadPanels:any[] = [
    {name:'ID (front)', addedUpload:false},
    {name:'ID (back)', addedUpload:false},
    {name:'Proof of address', addedUpload:false},
    {name:'Seflie Photo', addedUpload:false},
  ]

  base64Strings:string[] = [];
  isAllUploaded:boolean = false;
  hideUploadForm:boolean = true

  documentType:string = ""
  documentTypeLabel:string = "";

  verifyObj:Verify = new Verify()

  constructor(private util:Util, private router:Router, private memberService:MemberService, private app:AppComponent) {}

  public handleAddressChange(address: any){

  }

  onDropFile($event, index) {
    this.uploader.queue[index] = $event
    this.uploadPanels[index]["addedUpload"] = true
    
    let fileReader = new FileReader();
    fileReader.onloadend = (e) => {
        let imageData = fileReader.result;
        let rawData = imageData.split("base64,");
        if (rawData.length > 1) {
            rawData = rawData[1];
            this.base64Strings[index] = rawData;
        }
        console.log(this.base64Strings);
    }
    fileReader.readAsDataURL(this.uploader.queue[index]._file);
  }

  ngOnInit() {
    this.uploader.clearQueue()
  	this.user = this.util.getLocalObject("user") as User
  }

  setUploadContainerName(userId:string) {
    this.uploader.setOptions({
      disableMultipart:false,
      authTokenHeader:this.app.getAccessToken(),
      url: this.app.apiUrl + '/Members/'+ this.app.getUserId() +'/uploadFile?access_token=' + this.app.getAccessToken()
    })    
  }

  setDocumentType(type:string, labelName?:string) {
  	this.documentType = type;
  	this.documentTypeLabel = labelName;

  	this.uploadPanels[0]["name"] = labelName + '(front)';
  	this.uploadPanels[1]["name"] = labelName + '(back)';

  	this.hideUploadForm = false;
  }

  verify() {
  	
  	this.verifyObj.document_type = this.documentType;
  	this.verifyObj.background_checks = "0";
  	this.verifyObj.email = this.app.getMember().email;

  	var p = {
  		document_type:this.documentType,
  		// document_id_no:'111111',
  		// document_expiry_date:'2021-07-30',
  		// address:'9333 Lincoln Blvd apt 3231, Los Angeles, CA 90045',
  		// first_name:'John',
  		// last_name:'Doe',
  		// dob:'2021-07-30',
  		// background_checks:'0',
  		// email:'chris.kendricks07@gmail.com',
  		// phone_number: '+132332587954',
  		country:'US',
  		lang:'en'
  	}
  	this.memberService.verifyMember(this.app.getUserId() as string, this.app.getAccessToken(), p).subscribe(res=>this.afterVerify(res));	
  }

  afterVerify(res:any) {
  	console.log(res);
  }


}
