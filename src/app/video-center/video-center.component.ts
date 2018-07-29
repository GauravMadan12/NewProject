import { Component, OnInit } from '@angular/core';
import { Video } from './../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

  // videos: Video[] = [
  //   {"_id":"1","name":"Gaurav","email":"gm@mail.com","password":"1234"},
  //   {"_id":"2","name":"Sakshi","email":"sb@mail.com","password":"1234"},
  //   {"_id":"3","name":"Kajal","email":"kj@mail.com","password":"1234"},
  //   {"_id":"4","name":"Himani","email":"hs@mail.com","password":"1234"},
    
  // ]

  videos:Array<Video>

  selectedVideo: Video
  private hidenewVideo: boolean = true;

  constructor(private _videoService:VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
    .subscribe(resVideoData => this.videos = resVideoData)
  }

  onSelectVideo(video:any){
    this.selectedVideo = video;
    this.hidenewVideo = true;
    console.log(this.selectedVideo)
  }

  onSubmitAddVideo(video:Video){
    this._videoService.addVideo(video)
    .subscribe(resNewVideo => {
      this.videos.push(resNewVideo);
      this.selectedVideo = resNewVideo;
    })
  }

  newVideo(){
    this.hidenewVideo = false;
  }
}
