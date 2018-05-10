import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable }    from 'rxjs';

@Injectable()
export class TimelineService {

  private notify = new Subject<any>();
  
  /**
  * Observable string streams
  */
 
  constructor() { }

  public sendAction(action:string) {
  	this.notify.next(action);
  }

  getNotifier():Observable<any> {
  	return this.notify.asObservable();
  }

}
