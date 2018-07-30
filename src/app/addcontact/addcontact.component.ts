import { Component, OnInit } from '@angular/core';
import { Register } from './../register';
import { VideoService } from '../video.service';
import { NgFlashMessageService } from 'ng-flash-messages';


@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css'],
  providers: [VideoService]
})
export class AddcontactComponent implements OnInit {

  register:Array<Register>
  selectedData: Register

  constructor( 
    private _videoService: VideoService,
    private ngFlashMessageService: NgFlashMessageService,
   
   ) { }

  ngOnInit() {
  }

  onSubmit(data:Register){
    this._videoService.addcontact(data)
    .subscribe(resNewContact => {
      this.register.push(resNewContact);
      this.selectedData = resNewContact;
    })
  }
}
