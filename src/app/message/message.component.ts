import { Component, OnInit } from '@angular/core';
import {Message} from './../message';
import {VideoService} from './../video.service';
import {Http,Response} from '@angular/http';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [VideoService]
})
export class MessageComponent implements OnInit {

  constructor(private vidserv:VideoService, private http:Http) { }


  ngOnInit() {
  }

  
  onSend(msg){
    this.vidserv.sendMsg(msg).subscribe(resMsg => console.log(resMsg.json()))
  }

  
}

