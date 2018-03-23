import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { MemberService } from './member.service'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'

@Injectable()
export class ErrorHandlerService {

  constructor(private injector:Injector) {  }

  handleError(error: Error) {
      console.log('Error is: ', error);
      	
      if (error["status"] === 401){ 
        let memberService:MemberService = this.injector.get(MemberService)
        memberService.afterLogout()
      }else{
      	//alert(error.message);
      }     
      throw error
  }

}
