import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, Output } from '@angular/core';
import { Util } from '../shared/util/util'

declare var $: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [Util],
  host: {'(window:scroll)': 'track($event)'},
})
export class HomepageComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() isMobileOrTablet:boolean = false;
  isSafari:boolean = false;
  isIE:boolean = false;
  constructor(private u:Util) {}

  ngOnDestroy() {
    this.u.deleteLocalObject("user")
  }

  // onScroll() {
  //   var offset = this.document.scrollTop();
  //   offset = 75 + (offset * 0.2);
  //   console.log(offset);

  //   $('.wrench').css({
  //     '-moz-transform': 'rotate(' + offset + 'deg)',
  //     '-webkit-transform': 'rotate(' + offset + 'deg)',
  //     '-o-transform': 'rotate(' + offset + 'deg)',
  //     '-ms-transform': 'rotate(' + offset + 'deg)',
  //     'transform': 'rotate(' + offset + 'deg)',
  //   });

  //   $('#yellow-gear').css({
  //     '-moz-transform': 'rotate(' + offset + 'deg)',
  //     '-webkit-transform': 'rotate(' + offset + 'deg)',
  //     '-o-transform': 'rotate(' + offset + 'deg)',
  //     '-ms-transform': 'rotate(' + offset + 'deg)',
  //     'transform': 'rotate(' + offset + 'deg)',
  //   });

  //   offset = 360 - offset;
  //   $('.multigray-circle').css({
  //     '-moz-transform': 'rotate(' + offset + 'deg)',
  //     '-webkit-transform': 'rotate(' + offset + 'deg)',
  //     '-o-transform': 'rotate(' + offset + 'deg)',
  //     '-ms-transform': 'rotate(' + offset + 'deg)',
  //     'transform': 'rotate(' + offset + 'deg)',
  //   });

  //   $('#pink-gear').css({
  //     '-moz-transform': 'rotate(' + offset + 'deg)',
  //     '-webkit-transform': 'rotate(' + offset + 'deg)',
  //     '-o-transform': 'rotate(' + offset + 'deg)',
  //     '-ms-transform': 'rotate(' + offset + 'deg)',
  //     'transform': 'rotate(' + offset + 'deg)',
  //   });
  // }

  ngOnInit() {


      var ua = navigator.userAgent;

      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
        this.isMobileOrTablet = true;
      } else if(/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(ua)) {
        this.isMobileOrTablet = true;
      }
      if (navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
        this.isSafari = true;
      }

      if (/msie\s|trident\/|edge\//i.test(ua)) {
        this.isIE = true;
      }

    // Scoll implemenation
    // window.addEventListener('scroll', this.onScroll, true )

    // Dynamic Headline - https://css-tricks.com/snippets/css/typewriter-effect/
    var TxtType = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = 90;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

      var that = this;
      var delta = 90;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = 90;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 90;
      }

      setTimeout(function() {
        that.tick();
      }, delta);
    };

    window.onload = function() {
      var elements = document.getElementsByClassName('typewrite');
      for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
      document.body.appendChild(css);
    };

    // New Countdown Timer

    // Set the date we're counting down to
    var countDownDate = new Date("Oct 1, 2018 12:00:00").getTime();
    var secondsDegree = 0;
    var minutesDegree = 15;

    //window.addEventListener('blur', x); TODO fix it

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      secondsDegree += 30;
      minutesDegree -= 30;

      // Display the result
     document.getElementById("days").innerHTML = String(days);
      document.getElementById("hours").innerHTML = String(hours);
      document.getElementById("minutes").innerHTML = String(minutes);
      document.getElementById("seconds").innerHTML = String(seconds);

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);


      // Gear Charts
      function chartGearSpin(item){
        $(item).stop(true);
        $(item).animate(
          {rotation: 180},
          {
            duration: 500,
            easing: 'swing',
            step: function(now, fx) {
              $(this).css({"transform": "rotate(" + now + "deg)"});
              $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
              $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
              $(this).css('-o-transform', 'rotate(' + now + 'deg)');
              $(this).css('-ms-transform', 'rotate(' + now + 'deg)');
            }
          }
        );
        $(item).animate(
          {rotation: 0},
          {
            duration: .0001,
            easing: 'linear',
            step: function(now, fx) {
              $(this).css({"transform": "rotate(" + now + "deg)"});
              $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
              $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
              $(this).css('-o-transform', 'rotate(' + now + 'deg)');
              $(this).css('-ms-transform', 'rotate(' + now + 'deg)');
            }
          }
        );
      }

      // Bind Legend and Gears

      $('.chart-gear').mouseenter(function(){
        chartGearSpin(this);
      });

      $('.chart-text1a, #chart1b').mouseenter(function(){
        $('#marketing').addClass('chart-active chart-active1a');
      });

      $('#chart1b, .chart-text1a').mouseleave(function(){
        $('#marketing').removeClass('chart-active chart-active1a');
      });

      $('#marketing').mouseenter(function(){
        chartGearSpin('#chart1b');
      });

      $('#chart1a, .chart-text1b').mouseenter(function(){
        $('#development').addClass('chart-active chart-active2a');
      });

      $('#chart1a, .chart-text1b').mouseleave(function(){
        $('#development').removeClass('chart-active chart-active2a');
      });

      $('#development').mouseenter(function(){
        chartGearSpin('#chart1a');
      });

      $('#chart1c, .chart-text1c').mouseenter(function(){
        $('#acquisition').addClass('chart-active chart-active3a');
      });

      $('#chart1c, .chart-text1c').mouseleave(function(){
        $('#acquisition').removeClass('chart-active chart-active3a');
      });

      $('#acquisition').mouseenter(function(){
        chartGearSpin('#chart1c');
      });

      $('#chart1d, .chart-text1d').mouseenter(function(){
        $('#legal').addClass('chart-active chart-active4a');
      });

      $('#chart1d, .chart-text1d').mouseleave(function(){
        $('#legal').removeClass('chart-active chart-active4a');
      });

      $('#chart1k, .chart-text1e').mouseenter(function(){
        $('#legal2').addClass('chart-active chart-active2b');
      });

      $('#chart1k, .chart-text1e').mouseleave(function(){
        $('#legal2').removeClass('chart-active chart-active2b');
      });

      $('#legal').mouseenter(function(){
        chartGearSpin('#chart1d');
      });

      $('#legal2').mouseenter(function(){
        chartGearSpin('#chart1k');
      });

      $('#chart2a, .chart-text2a').mouseenter(function(){
        $('#ico').addClass('chart-active chart-active1b');
      });

      $('#chart2a, .chart-text2a').mouseleave(function(){
        $('#ico').removeClass('chart-active chart-active1b');
      });

      $('#ico').mouseenter(function(){
        chartGearSpin('#chart2a');
      });

      $('#chart2c, .chart-text2b').mouseenter(function(){
        $('#liquidity').addClass('chart-active chart-active2b');
      });

      $('#chart2c, .chart-text2b').mouseleave(function(){
        $('#liquidity').removeClass('chart-active chart-active2b');
      });

      $('#liquidity').mouseenter(function(){
        chartGearSpin('#chart2c');
      });

      $('#chart2b, .chart-text2c').mouseenter(function(){
        $('#distribution').addClass('chart-active chart-active3b');
      });

      $('#chart2b, .chart-text2c').mouseleave(function(){
        $('#distribution').removeClass('chart-active chart-active3b');
      });

      $('#distribution').mouseenter(function(){
        chartGearSpin('#chart2b');
      });

      $('#chart2d, .chart-text2d').mouseenter(function(){
        $('#presale').addClass('chart-active chart-active4b');
      });

      $('#chart2d, .chart-text2d').mouseleave(function(){
        $('#presale').removeClass('chart-active chart-active4b');
      });

      $('#presale').mouseenter(function(){
        chartGearSpin('#chart2d');
      });

      $('#chart2e, .chart-text2e').mouseenter(function(){
        $('#community').addClass('chart-active chart-active5');
      });

      $('#chart2e, .chart-text2e').mouseleave(function(){
        $('#community').removeClass('chart-active chart-active5');
      });

      $('#community').mouseenter(function(){
        chartGearSpin('#chart2e');
      });

      $('#chart2m, .chart-text2f').mouseenter(function(){
        $('#advisors').addClass('chart-active chart-active1b');
      });

      $('#chart2m, .chart-text2f').mouseleave(function(){
        $('#advisors').removeClass('chart-active chart-active1b');
      });

      $('#advisors').mouseenter(function(){
        chartGearSpin('#chart2m');
      });

      $('#chart2g, .chart-text2g').mouseenter(function(){
        $('#air-drop').addClass('chart-active chart-active2b');
      });

      $('#chart2g, .chart-text2g').mouseleave(function(){
        $('#air-drop').removeClass('chart-active chart-active2b');
      });

      $('#air-drop').mouseenter(function(){
        chartGearSpin('#chart2g');
      });

      // Video Modal -------------------

      $('.launch-modal').on('click', function(e){
        e.preventDefault();
        $( '#' + $(this).data('modal-id') ).modal();
        if ($( $(this).data('modal-id')).modal().selector == 'modal-video1') {
          $('#video-frame1').attr("src","https://youtube.com/embed/r43LhSUUGTQ?version=3&enablejsapi=1");
          // document.getElementById('video-frame1').play();

        } else if ($( $(this).data('modal-id')).modal().selector == 'modal-video2') {
          $('#video-frame2').attr("src","https://youtube.com/embed/r43LhSUUGTQ?version=3&enablejsapi=1");
          // document.getElementById('video-frame2').play();
        }
      });
      $(".modal-video-div").on("hidden.bs.modal", function () {
        $('#video-frame1').attr("src","");
        $('#video-frame2').attr("src","");
          // document.getElementById('video-frame1').pause();
          // document.getElementById('video-frame2').pause();
      });

    } // End ngOnInit

    ngAfterViewInit() {
      setTimeout(() => {
      (<HTMLElement>document.querySelector('#top-design')).style.opacity = '1';
    }, 1000);
    }

}






