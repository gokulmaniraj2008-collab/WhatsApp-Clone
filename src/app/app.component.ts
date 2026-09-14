import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Chat={id:number;name:string;avatar:string;last:string;time:string;unread:number;online:boolean;group?:boolean};
type Msg={from:'in'|'out';text:string;time:string};

@Component({selector:'app-root',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./app.component.html',styleUrl:'./app.component.css'})
export class AppComponent {
  query=''; text=''; selected=1; mobileChat=false;
  chats:Chat[]=[
    {id:1,name:'Arun Kumar',avatar:'https://i.pravatar.cc/96?img=12',last:'Bro, project ready?',time:'11:42 AM',unread:2,online:true},
    {id:2,name:'Priya',avatar:'https://i.pravatar.cc/96?img=47',last:'See you tomorrow ❤️',time:'10:18 AM',unread:0,online:true},
    {id:3,name:'AgriBot Team',avatar:'https://i.pravatar.cc/96?img=32',last:'Gokul: Sensor update pushed',time:'9:55 AM',unread:5,online:true,group:true},
    {id:4,name:'Vignesh',avatar:'https://i.pravatar.cc/96?img=68',last:'👍',time:'Yesterday',unread:0,online:false},
    {id:5,name:'College Group',avatar:'https://i.pravatar.cc/96?img=56',last:'Rahul: Tomorrow 9 AM',time:'Yesterday',unread:18,online:true,group:true}
  ];
  messages:Record<number,Msg[]>={1:[{from:'in',text:'Hey bro! 👋',time:'11:38 AM'},{from:'out',text:'Hey! What’s up?',time:'11:39 AM'},{from:'in',text:'Bro, project ready?',time:'11:42 AM'}],2:[{from:'in',text:'See you tomorrow ❤️',time:'10:18 AM'}],3:[{from:'in',text:'Sensor update pushed',time:'9:54 AM'},{from:'out',text:'Great! I’ll check it.',time:'9:55 AM'}],4:[{from:'in',text:'👍',time:'Yesterday'}],5:[{from:'in',text:'Tomorrow 9 AM',time:'Yesterday'}]};
  get filtered(){return this.chats.filter(c=>c.name.toLowerCase().includes(this.query.toLowerCase()));}
  get active(){return this.chats.find(c=>c.id===this.selected) ?? this.chats[0];}
  select(id:number){this.selected=id;this.mobileChat=true;}
  back(){this.mobileChat=false;}
  send(){const value=this.text.trim();if(!value)return;this.messages[this.selected]=[...(this.messages[this.selected]??[]),{from:'out',text:value,time:'now'}];this.text='';}
}
