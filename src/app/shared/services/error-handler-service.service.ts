import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { MemberService } from './member.service'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'

@Injectable()
export class ErrorHandlerService {

  constructor(private injector:Injector) {  }

  handleError(err: Error) {

  	console.log("Error: ", err)
  	let routerInjector = this.injector.get(Router) as Router;

 	// loopback error object
 	let errorObj = err["error"] ? err["error"]["error"] : null
	 	if(errorObj){
	 		let code = errorObj["statusCode"]
	 		let message = errorObj["message"]
	 	
	 		let details = errorObj["details"]
	 	
		

	 	// Unauthorized
	 	if(code == 401 || code == 400) {
	 		alert(message)

	 	// Form valiation error code	
	 	}else if(code == 422) {
	 		let errMessObj = details["messages"] as Object
	 		let keys = Object.keys(errMessObj)

	 		console.log(errMessObj)

	 		keys.filter($key => {
	 			console.log($key)
	 			let firstErrorMess = errMessObj[$key][0]
	 			alert($key + " " + firstErrorMess)
	 		})
	 	// Bad request error code	
	 	}
 	}

  }

  getErrorMessage(err:any) {

  }

}
