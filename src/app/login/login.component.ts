import { Component, OnInit } from '@angular/core';
// import {Video} from './../video';
import {VideoService}  from '../video.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [VideoService]

})
export class LoginComponent implements OnInit {

  constructor(
    private _VideoService:VideoService,
    private ngFlashMessageService: NgFlashMessageService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  onlogin(val)
  {
    const data = {
      email: val.email,
      password: val.password
    }
    this._VideoService.getlogin(data)
    .subscribe(resdata =>{ 
        this.route.navigate(['/dashboard'])
      
      console.log(resdata)
     })
  }
}
