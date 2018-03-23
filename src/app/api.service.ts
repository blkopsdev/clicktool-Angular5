import { Injectable, NgZone } from '@angular/core';
import {  Response } from '@angular/http'
import {Observable} from 'rxjs/Observable'
import {AppComponent} from './app.component'
import {Routes, RouterModule, Router} from '@angular/router'
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

export const enum HTTPmethod {
	CREATE,
	UPDATE,
	DELETE,
	GET
}

@Injectable()
export class ApiService{

  private apiUrl:String = "http://localhost:3000/api"
  public instanceName:String 
  public params:Object = {}
  public options:Object = {}
  public accessToken:string
  public id:String = ""
  public url:String
  public es:any
  public filter:String
  public role:String

  constructor(private http?:HttpClient, private app?:AppComponent) {
    
  }


  setInstanceId(id:string){
    this.id = id
  }

  public fire(method:HTTPmethod, auth:Boolean = false, ignoreRole?:boolean):Observable<any> {

    return this.sendRequest(method, auth, ignoreRole)
  }

  sendRequest(method:HTTPmethod, auth:Boolean = false, ignoreRole?:boolean):Observable<any>{
    var m:Observable<any>

    var instance = this.instanceName

    if(!ignoreRole){
      if(this.app.isAdmin()){
        instance = instance
      }else if(this.app.isOwner()){
        instance = "Members/" + this.app.getUserId() + "/" + instance
      }
    }

    var url:string = this.apiUrl + "/" + instance

    if(this.id){
      url = url + "/" + this.id
    }

    this.url = url

    if(this.filter){
      url = this.url + "?" + this.filter
    }

    var headers = new HttpHeaders();
    

    if(auth){
      headers = this.createAuthorizationHeader(headers);
    }

    this.options["headers"] = headers


    switch (method) {
      case HTTPmethod.DELETE:
        m = this.http.delete(url, this.options)
        break;
      case HTTPmethod.CREATE:
        m = this.http.post(url, this.params, this.options)
        break;
      case HTTPmethod.UPDATE:
        m = this.http.put(url, this.params, this.options)
        break;
      case HTTPmethod.GET:
        m = this.http.get(url, this.options)
        break;
      default: break;
    }

    return m
  }

  createAuthorizationHeader(headers: HttpHeaders):HttpHeaders {
    if(this.accessToken == null && this.app.getAccessToken()){
      return headers.set('Authorization', this.app.getAccessToken())
    }else if(this.accessToken){
      return headers.set('Authorization', this.accessToken)
    }
  }


  public setInstanceName(instanceName:String){
  	this.instanceName = instanceName
  }


}


