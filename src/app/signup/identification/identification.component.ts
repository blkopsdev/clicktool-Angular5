import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '../../shared/models/user'
import { Util } from '../../shared/util/util'
import { Router } from '@angular/router'
import { MemberService } from '../../shared/services/member.service'
import {Response} from '@angular/http'
import { FileSelectDirective, FileDropDirective, FileUploader, FileUploaderOptions, Headers, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { AppComponent } from '../../app.component'
import { UploaderComponent } from '../../shared/common/uploader/uploader.component'

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css'],
  providers: [Util, MemberService]
})
export class IdentificationComponent implements OnInit, OnDestroy {

  private user:User = new User()
  public uploader:FileUploader = new FileUploader({});


  uploadPanels:any[] = [
    {name:'Password/ID', addedUpload:false},
    {name:'Selfie with ID', addedUpload:false},
    {name:'Proof of residence', addedUpload:false},
  ]

  

  nextStepUrl:string = "/dashboard"
  previousUrl:string = "/signup/contribution"

  isAllUploaded:boolean = false;

  constructor(private util:Util, private router:Router, private memberService:MemberService, private app:AppComponent) { 

  }

  onDropFile($event, index) {
    this.uploader.queue[index] = $event
    this.uploadPanels[index]["addedUpload"] = true
  }

  ngOnInit() {
    this.uploader.clearQueue()
  	this.user = this.util.getLocalObject("user") as User
    this.onUploadComplete();
  }

  ngOnDestroy() {
    if( this.router.url == this.nextStepUrl || this.router.url == this.previousUrl ) { }else{
      this.util.deleteLocalObject("user");
    }  
  }

  signup() {     
    this.memberService.createAccount(this.user).subscribe(res=>this.afterCreateAccount(res))
  }

  onUploadComplete() {
    this.uploader.onCompleteAll = () => {
      this.memberService.afterLoginRoute()
    }  
  }

  afterCreateAccount(res:Response) {
    this.memberService.afterCreateAccount(this.user.email, this.user.password)
    .subscribe(session => this.afterLogin(session))
  }

  setUploadContainerName(userId:string) {
    this.uploader.setOptions({
      authTokenHeader:this.app.getAccessToken(),
      url: this.app.apiUrl + '/Members/'+ this.app.getUserId() +'/uploadFile?access_token=' + this.app.getAccessToken()
    })    
  }

  afterLogin(session:Response) {
    this.memberService.saveAccessToken(session)
    this.memberService.setLocalMemberObj(session)
    this.setUploadContainerName(session["userId"])
    this.uploader.uploadAll() 
  }


}
