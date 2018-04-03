import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { User } from './shared/models/user'
import { CookieService } from 'ngx-cookie-service';

declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

  host:String = "http://18.221.203.247"
  apiUrl:String = this.host + "/api"
  isMenuOpen:boolean = false;
  
  private cookieService: CookieService = new CookieService(document);

  constructor(){ }

  getUserId():String{
    if(this.getSession()){
      return this.getSession()["userId"]
    }
    return null
  }
  getUserName():string{
    if(this.getMember()){
      return this.getMember()["username"] as string
    }
    return null
  }
  getSession(){
    if(this.cookieService.check("session")){
      return JSON.parse( this.cookieService.get("session") )
    }
  }
  getMember():User{
    if(this.cookieService.check("member")){
       return JSON.parse(this.cookieService.get("member")) as User 
    }
  }
  getAccessToken(){
    if(this.getSession()){
      return this.getSession()["id"]
    }
    return null
  	
  }

  getUserRole(){
    if(!this.getSession()){ return null }
    return this.getSession()["user"]["role"]
  }

  isAdmin():boolean{
    if(this.getUserRole() == "admin"){
      return true
    }
    return false
  }

  isOwner():boolean {
    if(this.getUserRole() == "owner"){
      return true
    }
    return false    
  }

  isTeamMember(){
    if(this.getUserRole() == "teammember"){
      return true
    }
    return false     
  }

  getTeam(){
    return JSON.parse(this.cookieService.get("team"))
  } 

  getMemberStorage(){
    return JSON.parse(this.cookieService.get("member"))
  } 

  isLoggedIn(){
    if(this.getSession()){
      return true
    }
    return false
  }


  

}
