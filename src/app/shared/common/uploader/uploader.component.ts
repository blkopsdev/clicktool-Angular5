import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit, AfterViewInit {

  @Input() uploadDir:string
  @Input() name:string
  @Input() id:string
  @Input() index:string
  @Output() onAddFile:EventEmitter<any> = new EventEmitter()


  @ViewChild('AddedImage') droppedImage : ElementRef

  private nativeEle:ElementRef
  file:File
  fr:FileReader;
  showAfterDropImage:boolean = false
  fileItem:FileItem;
  hasBaseDropZoneOver:boolean
  uploader:FileUploader 
  fileName:string

  @Input() parentUploader:FileUploader;

  constructor() {}

  ngOnInit() {
    if(!this.parentUploader){
      throw new Error("You must include uploader object");
    }
    this.uploader = new FileUploader(null)
  	this.afterAddFileEventListener();
    this.fr = new FileReader();
    this.fr.onloadend = (loadEvent: any) => {
      this.nativeEle.nativeElement.src = loadEvent.target.result;
      this.showAfterDropImage = true;
    };
  }

  ngAfterViewInit() {
    this.nativeEle = this.droppedImage
  }

  afterAddFileEventListener() {
    var $this = this;
    this.uploader.onAfterAddingFile = f => {
      this.file = f._file;
      
      if( this.file.type == 'image/jpeg' || this.file.type == 'image/png'){
        this.fileName = this.file.name
        this.fr.readAsDataURL(this.file);
        this.fileItem = new FileItem(this.parentUploader, this.file, {})
        this.onAddFile.emit(this.fileItem)          
      }else{
        alert('File must be a jpg or png');      
      }
    }  	
  }

  fileOverAnother(e:any) {
  	this.hasBaseDropZoneOver = e;
  }

  removeUpload(e) {
    this.showAfterDropImage = false;
    e.preventDefault();
  }

  onClick() {
    
  }



}
