import { Component, OnInit. Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserApiService } from '../../../api-services/user-api.service';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'WD-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  providers: [UserApiService]
})
export class EditFormComponent implements OnInit {
  _user;
  @Input('user') 
  public set user(val: string) {
    this._user = val;
    this.setForm(val);
  }

  constructor(private userApi: UserApiService) { }

  ngOnInit() {}

  setForm(user){
    console.log(user)

    this.updateForm.setValue({
      email: user.email ? user.email : "" , 
      birthday: user.birthday ? user.birthday : "",
      first_name: user.first_name ? user.first_name : "",
      last_name: user.last_name ? user.last_name: "",
      gender: user.gender ? user.gender : "",
      description: user.description ? user.description : ""
    });
  }

  onSubmit(){
    if(this.updateForm.valid){
      this.userApi.updateUserById(this._user.id, this.updateForm.value)
      .subscribe(
        res => {
          console.log(res);
          UIkit.modal(editUserOverlay).hide(); // Hide the modal using uikit!
        }
      );
    }else{
      // If somehow the form gets submitted while invalid show an error notification
      UIkit.notification("<span uk-icon='icon: warning'></span> The form is not valid!", {status:'danger'});
    }
  }

  // Setting up the form and validators
  updateForm = new FormGroup({
    email: new FormControl(          // Each input is defined as a new form control
      "",                           // The initial value of the input se set here
      Validators.compose([          // The compose function is used to add multiple validators to one field
          Validators.required,      // This field is required
          Validators.email          // Ads the angualr default email validatitor
      ])
    ),
    birthday: new FormControl(
      "",
      Validators.required         // Since this field only have one validator there is no need for the compose function
    ),
    gender: new FormControl(
      null,
      Validators.required         // Since this field only have one validator there is no need for the compose function
    ),
    first_name: new FormControl(
      "", 
      Validators.compose([
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(32)
      ])
    ),
    last_name: new FormControl(
      "", 
      Validators.compose([
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(32)
      ])
    ),
    description: new FormControl(
      "", 
      Validators.compose([
        Validators.minLength(60), 
        Validators.maxLength(255)
      ])
    )
  });

}
