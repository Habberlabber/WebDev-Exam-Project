import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BookmarkApiService } from '../../../api-services/bookmark-api.service';
import { GameApiService } from '../../../api-services/game-api.service';

@Component({
  selector: 'WD-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.scss'],
  providers: [BookmarkApiService, GameApiService]
})
export class VoteCardComponent implements OnInit {

  @Input() person:any;
  @Output() vote = new EventEmitter<string>();

  constructor(
    private bmApi: BookmarkApiService,
    private gameApi: GameApiService
    ) { }
  ngOnInit() { }

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
      },
      err => {
        console.log(err);
      }
    );
  }

}
