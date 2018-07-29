import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoCenterComponent } from './video-center/video-center.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { MessageComponent } from './message/message.component';
import { MailComponent } from './mail/mail.component';
import { GroupComponent } from './group/group.component';


const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component: HomeComponent},
  {path:'videos',component:VideoCenterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,
    children: [{ path:'',redirectTo: '/dashboard', pathMatch: 'full'},
            { path:'addcontact',component: AddcontactComponent},
            { path:'message',component: MessageComponent},
            { path:'mail',component: MailComponent },
            { path:'group',component: GroupComponent}]
            }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
