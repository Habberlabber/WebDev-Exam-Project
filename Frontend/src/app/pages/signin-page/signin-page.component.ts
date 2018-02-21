import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'WD-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  // This function is called when the signin form gets submitted!
  onSubmit(){
    if(this.signupForm.valid){
      // @TODO send the form to the API! 
      this.router.navigate(['']); // Navigate to the main directory
    }else{
      // If somehow the form gets submitted while invalid show an error notification
      UIkit.notification("<span uk-icon='icon:  warning'></span> The form is not valid!", {status:'danger'});
    }
  }

  signinForm = new FormGroup({
    mail: new FormControl(          // Each input is defined as a new form control
      '',                           // The initial value of the input se set here
      Validators.compose([          // The compose function is used to add multiple validators to one field
          Validators.required,      // This field is required
          Validators.email          // Ads the angualr default email validatitor
      ])
    ),
    password: new FormControl(
     '', 
      Validators.compose([
        Validators.required, 
        Validators.minLength(8),    // Defines a minumul length for the field
        Validators.maxLength(128)   // Defines a max length for the field
      ])
    )
  });

}
