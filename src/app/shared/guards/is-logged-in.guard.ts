import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from '../../app.component'
import { MemberService } from '../../shared/services/member.service'

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  
  constructor(private app:AppComponent, private memberService:MemberService, private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if(this.app.getAccessToken()) {
		  this.router.navigate(['/dashboard'])			  
		  return false
		}else{
		  return true;
		}

  }
}
