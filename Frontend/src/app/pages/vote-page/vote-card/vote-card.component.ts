import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BookmarkApiService } from '../../../api-services/bookmark-api.service';
import { GameApiService } from '../../../api-services/game-api.service';
import { AuthApiService } from '../../../api-services/auth-api.service';

@Component({
  selector: 'WD-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.scss'],
  providers: [BookmarkApiService, GameApiService, AuthApiService]
})
export class VoteCardComponent implements OnInit {

  @Input() person:any;
  @Output() vote = new EventEmitter<string>();

  user;

  constructor(
    private bmApi: BookmarkApiService,
    private gameApi: GameApiService,
    private authApi: AuthApiService
    ) { }

  ngOnInit() {
    this.authApi.check().subscribe(
      res => {
        console.log(res);
        this.user = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  like(id){
    this.gameApi.vote(id, 1).subscribe(
      res => {
        console.log(res);
        this.vote.emit("next");
      },
      err => {
        this.person = null;
      }
    );
  }

  dislike(id){
    this.gameApi.vote(id, -1).subscribe(
      res => {
        console.log(res);
        this.vote.emit("next");
      },
      err => {
        this.person = null;
      }
    );
  }

  bookmark(id){
    this.bmApi.addBookmark(id).subscribe(
      res => {
        console.log(res);
        this.vote.emit("next");
      },
      err => {
        console.log(err);
      }
    );
  }

}
