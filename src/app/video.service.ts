import { Injectable } from '@angular/core';
import {Http,Response, Headers,RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { Video } from './video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private _getUrl = "/api/videos"
  private _postUrl = "/api/video"
  private _loginUrl = "/api/login"

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
}

//npm install --save rxjs-compat