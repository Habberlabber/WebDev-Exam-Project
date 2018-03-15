import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserApiService } from '../../api-services/user-api.service';
import { AuthApiService } from '../../api-services/auth-api.service';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

declare var UIkit: any;

@Component({
  selector: 'WD-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  providers: [UserApiService, AuthApiService]
})
export class SettingsPageComponent implements OnInit {

  constructor(
    private userApi: UserApiService,
    private authApi: AuthApiService
  ) { }
  user;
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

  toggleVIP(){
    let obj = {"user_type": this.user.user_type == 1 ? 2 : 1 };
    this.userApi.updateCurrentUser(obj)
      .subscribe(
        res => {
          console.log(res);
          this.user.user_type = obj.user_type;
        }
      );
  }

  passwordSubmit(){
    if(this.passwordForm.valid){
      this.userApi.updateCurrentUser(this.passwordForm.value)
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
  passwordForm = new FormGroup({
    password: new FormControl(
      "", 
      Validators.compose([
        Validators.required, 
        Validators.minLength(8),    // Defines a minumul length for the field
        Validators.maxLength(128)   // Defines a max length for the field
      ])
    ),
    confirmPassword: new FormControl(
      "", 
      Validators.required         // The validation for confirm password is defined as the 3. parameter of the FormGorup function
    )
  }, this.passwordMatchValidator);

  // Function used to validate the password and confirm password are equal
  passwordMatchValidator(g: FormGroup) {
   return g.get('password').value === g.get('confirmPassword').value
      ? null : {'mismatch': true};
  }

}
