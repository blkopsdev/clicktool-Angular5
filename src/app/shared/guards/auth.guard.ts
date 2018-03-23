import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService, HTTPmethod } from '../../api.service'
import { AppComponent } from '../../app.component'
import { Router } from '@angular/router'
import {Observable} from 'rxjs/Observable'
import { CookieService } from 'ngx-cookie-service';
import { MemberService } from '../../shared/services/member.service'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private app:AppComponent, private memberService:MemberService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if(this.app.getAccessToken()) {
      return true
    }else{
      this.memberService.afterLogout();
      return false;
    }

  }


}
