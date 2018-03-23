import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

   @Input() label:string
   @Input() uploadDir:string

  constructor() { }

  ngOnInit() {
  }

}
