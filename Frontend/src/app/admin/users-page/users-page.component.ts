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

  // Users array used to store users for the ngFor in the view
  users:any = [];
  choosenUser:any;

  constructor(private userApi: UserApiService) { }

  ngOnInit() {
    // Update the users array with the api results
    this.users = this.getUsers();
  }

  // Function to get all users
  getUsers(){
    this.userApi.listUsers().subscribe(users => {
      // Return users
      return this.users = users;
    });
  }

  // Deletes the user og the given id parameter
  delete(id){
    this.userApi.deleteUserById(id).subscribe(res => {
      // Update the users array with new api results
      this.users = this.getUsers();
    });
  }

  chooseUser(user){
    this.choosenUser = user;
  }

}
