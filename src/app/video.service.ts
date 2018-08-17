import { Injectable } from '@angular/core';
import {Http,Response, Headers,RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { Video } from './video';
import {Register } from './register';
import {Message} from './message';

 
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private _getUrl = "/api/videos"
  private _postUrl = "/api/video"
  private _loginUrl = "/api/login"
  private _contactUrl = "/api/register"
  private _mailUrl = "/api/mails"
  private _groupUrl = "/api/data"
  private _groupMail = "/api/gpmails"
  private _groupMsg = "/api/http://api.msg91.com/api/v2/sendsms"

  constructor(private _http:Http) { }

  getVideos(){
    return this._http.get(this._getUrl)
    .pipe(map((response: Response) => response.json()));
  }

  addVideo(video:Video){
    let headers = new Headers({'Content-Type':'application/json'})
    let options = new RequestOptions({ headers:headers})
    return this._http.post(this._postUrl, JSON.stringify(video),options)
    .pipe(map((response: Response) => response.json()));
    
  }

  getlogin(data){
    let headers = new Headers({'Content-Type':'application/json'})
    let options = new RequestOptions({ headers:headers})
    return this._http.post(this._loginUrl, JSON.stringify(data),options)
    .pipe(map((response: Response) => response.json()));

  }

  addcontact(data:Register){
    let headers = new Headers({'Content-Type':'application/json'})
    let options = new RequestOptions({ headers:headers})
    return this._http.post(this._contactUrl, JSON.stringify(data),options)                                                                    
    .pipe(map((response: Response) => response.json()));
  }
  
  sendMsg(msg){
        let headers = new Headers({'Content-Type':'application/json'})
    let options = new RequestOptions({ headers:headers})
    return this._http.get("http://api.msg91.com/api/sendhttp.php?sender="+msg.sender+"&route=4&mobiles="+msg.mobiles+"&authkey=####&country=91&message="+msg.message,options)
    .pipe(map((response: Response) => response.json()));
  }

  sendMail(val){
    let headers = new Headers({'Content-Type':'application/json'})
    let options = new RequestOptions({ headers:headers})
    return this._http.post(this._mailUrl, JSON.stringify(val),options)                                                                    
    .pipe(map((response: Response) => response.json()));
  }

  getData(val){
    let headers = new Headers({'Content-Type':'application/json'})
    let options = new RequestOptions({ headers:headers})
    return this._http.post(this._groupUrl, JSON.stringify(val),options)
    .pipe(map((response: Response) => response.json()));
  }

  sendGpMail(value,data,sub){
    let headers = new Headers({'Content-Type':'application/json'})
    let options = new RequestOptions({ headers:headers})
    return this._http.post(this._groupMail,{data,value,sub},options)                                                                    
    .pipe(map((response: Response) => response.json()));
    // console.log(val)
  }

  sendMessage(val,msg){
    let headers = new Headers({'Content-Type':'application/json'})
    let options = new RequestOptions({ headers:headers})
    return this._http.get("http://api.msg91.com/api/sendhttp.php?sender=MSGIND&route=4&mobiles="+val+"&authkey=#######&country=91&message="+msg,options)
    .pipe(map((response: Response) => response.json()));
  }
}

//npm install --save rxjs-compat