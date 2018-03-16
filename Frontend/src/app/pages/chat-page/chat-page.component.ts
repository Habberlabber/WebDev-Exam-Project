import { Component, OnInit } from '@angular/core';

import { ChatApiService } from '../../api-services/chat-api.service';
import { AuthApiService } from '../../api-services/auth-api.service';

@Component({
  selector: 'WD-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  providers: [ChatApiService, AuthApiService]
})
export class ChatPageComponent implements OnInit {
  chats = [];
  currentChatId;
  messages;
  currentUser;
  messageTimeout;

  constructor(
    private chatApi: ChatApiService,
    private authApi: AuthApiService
  ) { }

  ngOnInit() {
    this.getChats();
    this.authApi.check().subscribe(
      res => {
        this.currentUser = res;
      }
    );
  }

  getChats(){
    this.chatApi.getchats().subscribe(
      res => {
        console.log(res);
        this.chats = res;
        if(this.chats[0])
          this.selectChat(this.chats[0].id);
      }
    );
  }

  selectChat(chatId){
    this.currentChatId = chatId;
    this.getMessages();
  }

  getMessages(){
    clearTimeout(this.messageTimeout);
    this.chatApi.getMessages(this.currentChatId).subscribe(
      res => {
        this.messages = res;
        console.log(res);
        this.messageTimeout = setTimeout(
          ()=> {
            this.getMessages()
          }, 1000*5
        );
      }
    );

  }

  sendMessage(message){
    console.log(message);
    message = message.replace(/\n/g, "<br>");
    this.chatApi.postMessage(this.currentChatId, message).subscribe(
      res => {
        console.log(res);
        this.getMessages();
      }
    );
  }

}
