import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'WD-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.scss']
})
export class VoteCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  person:any = {
    firstname: "Test",
    lastname: " user",
    desc: "Dette er en lang beskrivelse af en perosn Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem labore odio omnis adipisci nostrum optio dolorem odit qui vitae eius magni, voluptatum at debitis rerum mollitia eos dolor sequi repellendus!"
    age: 26,
    images: [
    {
      url: "https://www.shareicon.net/download/512x512/2016/05/24/769972_people_512x512.png"
      title: "This is me",
      desc: "Ain't i a beauty?"
    },
    {
      url: "https://www.shareicon.net/download/512x512/2016/05/24/769972_people_512x512.png"
      title: "This is me",
      desc: "Ain't i a beauty?"
    },
    {
      url: "https://www.shareicon.net/download/512x512/2016/05/24/769972_people_512x512.png"
      title: "This is me",
      desc: "Ain't i a beauty?"
    },
    {
      url: "https://www.shareicon.net/download/512x512/2016/05/24/769972_people_512x512.png"
      title: "This is me",
      desc: "Ain't i a beauty?"
    }
    ]
  }

}
