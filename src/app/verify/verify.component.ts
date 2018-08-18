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

declare var $:any

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

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

export class VerifyResponse {
  message:string
  reference:string
  signature:string
  status_code:string
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
    {
      name:'ID (front)', 
      addedUpload:false,
      defaultUploadMessage:""
    },
    {
      name:'ID (back)', addedUpload:false
    },
    {
      name:'Proof of address', addedUpload:false
    },
    {
      name:'Seflie Photo', addedUpload:false
    },
  ]

  base64Strings:string[] = [];
  isAllUploaded:boolean = false;
  hideUploadForm:boolean = true
  documentType:string = ""
  documentTypeLabel:string = "";
  verifyObj:Verify = new Verify()
  didBeginVerification:boolean = false;
  form: FormGroup;
  isLoading:boolean = false;
  defaultUploadMessage:string = "To the right drag and drop, or click to browse needed files. We'll use these files to verify your identity."

  constructor(private util:Util, private router:Router, private memberService:MemberService, private app:AppComponent, private formBuilder: FormBuilder) {}

  public handleAddressChange(address: any){}

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
    }
    fileReader.readAsDataURL(this.uploader.queue[index]._file);
  }

  ngOnInit() {
    console.log(this.user)
    this.uploader.clearQueue()
  	this.user = this.util.getLocalObject("user") as User

    this.form = this.formBuilder.group({
      document_id_no:[null, Validators.required],
      document_expiry_date:[null, Validators.required],
      first_name:[null, Validators.required],
      last_name:[null, Validators.required],
      address:[null, Validators.required],
      dob:[null, Validators.required],
      phone_number:[null, Validators.required],
      didAgreeToTerms:[null, Validators.required],
    })

    $('html,body').scrollTop(0);

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

  	this.uploadPanels[0]["name"] = labelName + ' (front)';
  	this.uploadPanels[1]["name"] = labelName + ' (back)';

  	this.hideUploadForm = false;
  }

  verify() {
  	
  	this.verifyObj.document_type = this.documentType;
  	this.verifyObj.background_checks = "1";
  	this.verifyObj.email = this.app.getMember() ? this.app.getMember().email : "";
  	this.verifyObj.country = "US";
  	this.verifyObj.lang = "en"

    // ID Document front

    this.verifyObj.document_front_image = this.base64Strings[0];
    this.verifyObj.document_back_image = this.base64Strings[1];
    this.verifyObj.document_address_image = this.base64Strings[2];
    this.verifyObj.face_image = this.base64Strings[3];

    this.form.updateValueAndValidity();

    if(this.form.valid){
     this.isLoading = true;
     this.memberService.verifyMember(this.app.getUserId() as string, this.app.getAccessToken(), this.verifyObj).subscribe(res=>this.afterVerify(res));
    }else{
       this.isLoading = false;
       Object.keys(this.form.controls).filter($0 => {
        this.form.get($0).markAsTouched({ onlySelf: true })
      })  

      if(!this.verifyObj.document_front_image) {
        return       
      }

    } 

  }

  setDefaultUploadMessage(label:string) {
    this.defaultUploadMessage = label;
  }

  begin() {
    this.didBeginVerification = true;
  }

  logout() {
    this.memberService.logout(this.app.getAccessToken()).subscribe(res=>this.memberService.afterLogout()); 
    return false;
  }

  afterVerify(res:VerifyResponse) {
    console.log(res);
    this.isLoading = false;
  	if(res.status_code == "SP1"){
      var m = this.app.getMember();
      m.isShuftiproVerified = true
      this.memberService.setLocalMemberObj(m);
      alert('You passed verification process');
      this.router.navigate(['/dashboard']);
    }else if(res.status_code == "SP0"){
      alert('We\'re unable to verify the account using the information you provided. Please try again.');
    }else{
      alert(res.message);
    }
  }


}
