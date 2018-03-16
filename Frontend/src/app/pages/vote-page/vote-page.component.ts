import { Component, OnInit } from '@angular/core';

import { GameApiService } from '../../api-services/game-api.service';

@Component({
  selector: 'WD-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss'],
  providers: [GameApiService]
})
export class VotePageComponent implements OnInit {
  person;
  constructor(
    private gameApi: GameApiService
  ) { }

  ngOnInit() {
    this.getNext();
  }

  getNext(){
    this.gameApi.getPlayer().subscribe(
      res => {
        res.age = new Date(res.birthday);
        res.age = Date.now() - res.age;
        res.age = new Date(res.age);
        res.age = Math.abs(res.age.getUTCFullYear() - 1970);
        this.person = res;
      },
      err => {
        this.person = null;
      }
    );
  }

  doVote(event){
    console.log(event);
    this.gameApi.vote(event.id, event.vote).subscribe(
      res => {
        console.log(res);
        this.getNext();
      },
      err => {
        this.person = null;
      }
    );
  }

}
