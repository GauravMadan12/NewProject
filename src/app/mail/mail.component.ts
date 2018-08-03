import { Component, OnInit } from '@angular/core';
import {VideoService} from '../video.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css'],
  providers: [VideoService]
})
export class MailComponent implements OnInit {

  constructor(private vidserv: VideoService) { }

  ngOnInit() {
  }

  onSendMail(val){
      this.vidserv.sendMail(val).subscribe(resData => console.log(resData))
  }
}
