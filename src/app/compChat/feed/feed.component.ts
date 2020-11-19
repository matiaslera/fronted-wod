import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { ChatMessage } from 'src/app/domain/chat';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  //feed:AngularFireList<ChatMessage>;
  feed: ChatMessage[]
  constructor(private chat: ChatService) {

   }

  ngOnInit() {
    //this.feed = this.chat.getMessages();
    this.chat.getMessages().valueChanges().subscribe(chat=>{this.feed=chat})
  }

  ngOnChanges() {
   // this.feed = this.chat.getMessages();
  }
}
