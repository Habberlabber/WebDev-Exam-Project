import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserApiService } from '../../../api-services/user-api.service';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

declare var UIkit: any;

@Component({
  selector: 'WD-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  constructor(private userApi: UserApiService) { }

  ngOnInit() { }

  onSubmit(){
    if(this.createForm.valid){
      this.userApi.createUser(this.createForm.value)
      .subscribe(
        res => {
          console.log(res);
          UIkit.modal("createUserOverlay").hide(); // Hide the modal using uikit!
        }
      );
    }else{
      // If somehow the form gets submitted while invalid show an error notification
      UIkit.notification("<span uk-icon='icon: warning'></span> The form is not valid!", {status:'danger'});
    }
  }

  // Setting up the form and validators
  createForm = new FormGroup({
    email: new FormControl(          // Each input is defined as a new form control
      "",                           // The initial value of the input se set here
      Validators.compose([          // The compose function is used to add multiple validators to one field
          Validators.required,      // This field is required
          Validators.email          // Ads the angualr default email validatitor
      ])
    ),
    password: new FormControl(
      "",
      Validators.compose([
        Validators.required, 
        Validators.minLength(8),    // Defines a minumul length for the field
        Validators.maxLength(128)   // Defines a max length for the field
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
