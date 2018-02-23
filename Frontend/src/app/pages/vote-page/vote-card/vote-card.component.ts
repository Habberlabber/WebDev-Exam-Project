import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'WD-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.scss']
})
export class VoteCardComponent implements OnInit {

  @Input() person:any;

  constructor() { }

  ngOnInit() {
  }

}
