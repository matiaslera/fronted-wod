import { Component, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/domain/chat';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  feed//: FirebaseListObservable<ChatMessage[]>;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.feed = this.chat.getMessages();
  }

  ngOnChanges() {
    this.feed = this.chat.getMessages();
  }
}
