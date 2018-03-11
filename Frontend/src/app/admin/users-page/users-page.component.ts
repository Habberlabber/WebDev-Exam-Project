import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../api-services/user-api.service';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'WD-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  providers: [UserApiService]
})
export class UsersPageComponent implements OnInit {

  constructor(private userApi: UserApiService) { }

  ngOnInit() {

    this.userApi.listUsers().subscribe(res => {
        console.log(res);
      },
      err => {
        console.log('ERROR!');
      }
    );

  }

}
