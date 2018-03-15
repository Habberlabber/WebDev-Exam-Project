import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserApiService } from '../../../api-services/user-api.service';
import { AuthApiService } from '../../../api-services/auth-api.service';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

declare var UIkit: any;

@Component({
  selector: 'WD-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
  providers: [UserApiService, AuthApiService]
})
export class SettingsFormComponent implements OnInit {

  constructor(
    private userApi: UserApiService,
    private authApi: AuthApiService
  ) { }

  ngOnInit() { 
    this.authApi.check().subscribe(res => {
      this.setForm(res); 
    }, error => {
      console.log(error);
    });
  }

  setForm(user){
    this.settingsForm.setValue({
      preference: user.preference ? user.preference : "",
      description: user.description ? user.description : ""
    });
  }

  onSubmit(){
    if(this.settingsForm.valid){
      this.userApi.updateCurrentUser(this.settingsForm.value)
      .subscribe(
        res => {
          console.log(res);
        }
      );
    }else{
      // If somehow the form gets submitted while invalid show an error notification
      UIkit.notification("<span uk-icon='icon: warning'></span> The form is not valid!", {status:'danger'});
    }
  }

  // Setting up the form and validators
  settingsForm = new FormGroup({
    description: new FormControl(
      "", 
      Validators.compose([
        Validators.minLength(60), 
        Validators.maxLength(255)
      ])
    ),
    preference: new FormControl(
      null
    )
  });

}
