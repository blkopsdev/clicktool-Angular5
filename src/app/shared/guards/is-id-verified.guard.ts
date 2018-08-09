import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from '../../app.component'
import { Router } from '@angular/router'
import { MemberService } from '../../shared/services/member.service'

@Injectable()
export class IsIdVerifiedGuard implements CanActivate {

  constructor(private app:AppComponent, private memberService:MemberService, private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  	if(this.app.getMember() && !this.app.getMember().isShuftiproVerified) {
  		this.router.navigate(['/verify']);
  		return false;	
  	}else{
  		return true;
  	}

  }
}
