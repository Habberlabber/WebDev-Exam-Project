import { Component, OnInit } from '@angular/core';

import { BookmarkApiService } from '../../api-services/bookmark-api.service';

@Component({
  selector: 'WD-bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.scss'],
  providers: [BookmarkApiService]
})
export class BookmarksPageComponent implements OnInit {

  people = [];

  constructor(private bmApi: BookmarkApiService) { }

  ngOnInit() {
    this.getPeople()
  }

  getPeople(){
    this.bmApi.getBookmarks().subscribe(
      res => {
        for(let p of res){
          p.age = new Date(p.birthday);
          p.age = Date.now() - p.age;
          p.age = new Date(p.age);
          p.age = Math.abs(p.age.getUTCFullYear() - 1970);
        }
        this.people = res;
        console.log(res)
      },
      err => {
        console.log(err);
      }
    );
  }

}
