import { Injectable } from '@angular/core';
import { ApiService, HTTPmethod } from '../../api.service'
import {Observable} from 'rxjs/Observable'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'
import {Response} from '@angular/http'
import { User } from '../models/user'

export enum Roles {
	ADMIN,
	OWNER,
	WORKER
}

@Injectable()
export class MemberService {

  constructor(private api?:ApiService, private router?:Router, private cookieService?: CookieService) { }

  getAllMembersByRole(roles:Roles):Observable<any>{
  	var filter = {}
  	filter["where"] = {}

  	switch (roles) {
  		case Roles.ADMIN:
  			filter["where"]["role"] = "admin"
  			break;
  		case Roles.WORKER:
  			filter["where"]["role"] = "worker"
  			break;
  		default:

  			// code...
  			break;
  	}
 	  this.api.filter = "filter=" + JSON.stringify(filter)
    this.api.setInstanceName("Members")
    return this.api.fire(HTTPmethod.GET, true)
  }

  getSessions(userId:string) {
    this.api.filter = null;
    this.api.id = null;
    this.api.setInstanceName("Members/" + userId + "/accessTokens");
    return this.api.fire(HTTPmethod.GET, true, true)
  }

  findMemberById(userId:string) {
    this.api.params = {}
    this.api.setInstanceName("Members")
    this.api.filter = null
    this.api.id = userId
    return this.api.fire(HTTPmethod.GET, true, true)    
  }

  deleteAccessToken(userId: string, accessTokenId:string) {
    this.api.filter = null;
    this.api.id = null;
    this.api.setInstanceName("Members/" + userId + "/accessTokens/" + accessTokenId);
    return this.api.fire(HTTPmethod.DELETE, true, true)
  }

  logout(accessToken:string) {
    this.api.id = null
    this.api.filter = null
    this.api.accessToken = accessToken
    this.api.setInstanceName("Members/logout")
    return this.api.fire(HTTPmethod.CREATE, true, true)  
  }

  afterLogout() {
    this.deleteLocalCookieSession();
    this.router.navigate(["/"])    
  }

  login(email:string, password:string) {    
    this.api.filter = null
    this.api.id = null
    this.api.setInstanceName("Members/login?include=user")
    this.api.params = {"email":email, "password":password}
    return this.api.fire(HTTPmethod.CREATE, false, true);    
  }

  afterLogin(res:Response):Response {
    this.saveAccessToken(res)
    this.cookieService.set("member", JSON.stringify(res["user"]))  
    this.router.navigate(["/dashboard"]) 
    return res;
  }

  private saveAccessToken(body){
    this.cookieService.set("session", JSON.stringify(body))  
  }

  deleteLocalCookieSession(){
    this.cookieService.delete("member");
    this.cookieService.delete("session");
  }

  createAccount(user:User) {
    this.api.params = user
    this.api.setInstanceName("Members")      
  	return this.api.fire(HTTPmethod.CREATE, false, true)
  }

  afterCreateAccount(email:string, password:string) {
    return this.login(email, password)
  }

}
