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
  // private _msgUrl = "/api/send"

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

  // sendMsg(msg){
  //   let headers = new Headers({'Content-Type':'application/json'})
  //   let options = new RequestOptions({ headers:headers})
  //   return this._http.post(this._msgUrl, JSON.stringify(msg),options)                                                                    
  //   .pipe(map((response: Response) => response.json()));
  // }
  
  sendMsg(msg){
        let headers = new Headers({'Content-Type':'application/json'})
    let options = new RequestOptions({ headers:headers})
    return this._http.get("http://api.msg91.com/api/sendhttp.php?sender="+msg.sender+"&route=4&mobiles="+msg.mobiles+"&authkey=228815AVZ7FrV8NH5b5dd1ed&country=91&message="+msg.message,options)
    .pipe(map((response: Response) => response.json()));
  }
}

//npm install --save rxjs-compat