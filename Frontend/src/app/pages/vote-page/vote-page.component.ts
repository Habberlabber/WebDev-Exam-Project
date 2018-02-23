import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'WD-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss']
})
export class VotePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  person = {
    firstname: "Test",
    lastname: " user",
    desc: "Hej med dig! Dette er en lang beskrivelse af en perosn Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem labore odio omnis adipisci nostrum optio dolorem odit qui vitae eius magni, voluptatum at debitis rerum mollitia eos dolor sequi repel!",
    age: 26,
    images: [
    {
      url: "https://www.shareicon.net/download/512x512/2016/05/24/769972_people_512x512.png",
      title: ""
    },
    {
      url: "https://www.shareicon.net/download/512x512/2016/05/24/769972_people_512x512.png",
      title: "This is me 1"
    },
    {
      url: "https://www.shareicon.net/download/512x512/2016/05/24/769972_people_512x512.png",
      title: ""
    },
    {
      url: "https://www.shareicon.net/download/512x512/2016/05/24/769972_people_512x512.png",
      title: "This is me 2"
    }
    ]
  }

}
