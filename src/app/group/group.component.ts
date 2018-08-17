import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import {Register} from '../register';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [VideoService]
})
export class GroupComponent implements OnInit {

  value = []
  num = []
  msg='';
  sub='';
  item = '';
  item1 = '';
  
  constructor(private vidserv: VideoService) { }

  ngOnInit() {

  }

  Regis:Array<Register>

  send(val){
    this.vidserv.getData(val).subscribe(resData =>
       {
         console.log(resData)
         this.Regis = resData
        })
  }

  onSubmit(data){
    console.log(this.value)
    this.msg = data.message
    this.sub = data.subject
    this.vidserv.sendGpMail(this.value,this.msg,this.sub)
     .subscribe(resData=> console.log(resData))
  }

 func(val){
   this.value.push(val.email)
   this.num.push(val.phone)
  console.log(this.value)
  console.log(this.num)
 }

 sendMsg(vals){
  //  this.item = vals.mobnum;
    this.item1 = vals.msg;
    this.num.forEach(element => {
     this.vidserv.sendMessage(element,vals.msg)
    .subscribe(resData => console.log(resData))
  });
 }

 
}
