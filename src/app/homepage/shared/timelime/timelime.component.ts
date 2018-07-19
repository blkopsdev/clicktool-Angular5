import { Component, Output, OnInit, EventEmitter, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Animation } from '../../../shared/util/animation'
import { Box } from '../../../shared/models/box'
import { YellowboxComponent } from './yellowbox/yellowbox.component'
import { TimelineService } from '../timeline.service';
import { Subscription } from 'rxjs/Subscription';

declare var $:any

@Component({
  selector: 'app-timelime',
  templateUrl: './timelime.component.html',
  styleUrls: ['./timelime.component.css'],
  providers:[Animation, TimelineService]
})
export class TimelimeComponent implements OnInit, AfterViewInit {

  @ViewChild('machineScreenTxt') machineTxtEle:ElementRef;
  @ViewChild('mileStoneGear') mileStoneGear:ElementRef;

  boxes:Box[] = [
    new Box("DEC", "'16", "Funding For Development", "DEC '16"),
    new Box("FEB", "'17", "Software Architecture Design", "FEB '17"),
    new Box("MAY", "'17", "Development Team Expanded", "MAY '17"),
    new Box("JUN", "'17", "Development Begins", "JUN '17"),
    new Box("DEC", "'17", "Closed Environment Launch", "DEC '17"),
    new Box("JUL", "'18", "First Prototype Completed", "JUL '18"),
    new Box("AUG", "'18", "Beta Software Release", "AUG '18"),
    new Box("SEP", "'18", "Token Sale Goes Live", "SEP '18"),
    new Box("DEC", "'18", "Token Listed On Exchanges", "DEC '18"),
    new Box("JAN", "'19", "Landing Page Builder Development", "JAN '19"),
    new Box("FEB", "'19", "Decentralized Tracking Beta Release", "FEB '19"),
    new Box("MAY", "'19", "Decentralized Platform Release", "MAY '19"),
  ]

  fslide:any;
  windowSlide:any;
  windowSlideBottom:any
  movingRight:boolean = true

  constructor(private animation:Animation, private timelineService: TimelineService ) {}

  ngAfterViewInit() {
    var gear = $('.milestone-gear');
    var p = 45

    this.fslide = $('.slider').bxSlider({
      minSlides:5,
      maxSlides:5,
      startSlide:this.boxes.length-2,
      // slideWidth:300,
      moveSlides:1,
      slideMargin: 0,
      auto: true,
      wrapperClass:'bx-wrapper-full',
      pager:false,
      controls:false,
      autoDirection:'prev',
      onSlideBefore: ($slideElement, oldIndex, newIndex) => {

         if(!this.movingRight){
           p = -45
         }else{
           p = 45
         }

         this.animation.spin(gear, p, 500)
      }
    });
    this.windowSlide = $('.sliderWindow').bxSlider({
      minSlides:15,
      maxSlides:1,
      // slideWidth:200,
      moveSlides:1,
      slideMargin: 0,
      auto: true,
      wrapperClass:'bx-wrapper-small',
      pager:false,
      controls:false,
      autoDirection:'prev',
      touchEnabled: false,
    });
   this.windowSlideBottom = $('.sliderWindowBottom').bxSlider({
      minSlides:1,
      maxSlides:1,
      // slideWidth:200,
      moveSlides:1,
      slideMargin: 0,
      auto: true,
      wrapperClass:'bx-wrapper-bottom',
      pager:false,
      controls:false,
      autoDirection:'prev',
      touchEnabled: false,
    });
  }

  ngOnInit() {

  }


  animateLeft() {

    this.movingRight = false
    this.fslide.stopAuto()
    this.fslide.goToNextSlide()

    this.windowSlide.stopAuto()
    this.windowSlide.goToNextSlide()

    this.windowSlideBottom.stopAuto()
    this.windowSlideBottom.goToNextSlide()

    //console.log( this.fslide.goToNextSlide() )
  }

  animateRight() {

    this.movingRight = true

    this.fslide.stopAuto()
    this.fslide.goToPrevSlide()

    this.windowSlide.stopAuto()
    this.windowSlide.goToPrevSlide()

    this.windowSlideBottom.stopAuto()
    this.windowSlideBottom.goToPrevSlide()

    //console.log( this.fslide.goToNextSlide() )
  }

  swipe(e) {

    var container = $('.directions')
    var containerWidth = container.width()
    var containerWidthDevide = containerWidth/2

    var offsetX = e.offsetX

    if(offsetX <= containerWidthDevide ) {
      this.animateLeft()
    }

    if(offsetX >= containerWidthDevide ) {
      this.animateRight()
    }

  }


}
