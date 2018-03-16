import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserApiService } from '../../api-services/user-api.service';

declare var UIkit: any;

@Component({
  selector: 'WD-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
  providers: [ UserApiService ]
})
export class SignupPageComponent implements OnInit {
  // Get the signup data form localstorage if present
  formCache:any = localStorage.signupForm ? JSON.parse(localStorage.signupForm) : {};

  constructor(
    private router: Router,
    private userApi: UserApiService
  ) { }

  ngOnInit() {
    // Subscribe to the changes in the forms value
    this.signupForm.valueChanges. subscribe(form => {
      // Save the formdata in localstorage to be used if user does not complete registration
      localStorage.setItem('signupForm', JSON.stringify(form));
    });

  }

  // This function is called when the sigunp form gets submitted!
  onSubmit(){
    if(this.signupForm.valid){
      this.userApi.createUser(this.signupForm.value).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['']); // Navigate to the main directory
        },
        err => {
          console.log(err);
        }
      );
      
    }else{
      // If somehow the form gets submitted while invalid show an error notification
      UIkit.notification("<span uk-icon='icon:  warning'></span> The form is not valid!", {status:'danger'});
    }
  }

  // Setting up the form and validators
  signupForm = new FormGroup({
    email: new FormControl(          // Each input is defined as a new form control
      this.formCache.email,          // The initial value of the input se set here
      Validators.compose([          // The compose function is used to add multiple validators to one field
          Validators.required,      // This field is required
          Validators.email          // Ads the angualr default email validatitor
      ])
    ),
    password: new FormControl(
      this.formCache.password, 
      Validators.compose([
        Validators.required, 
        Validators.minLength(8),    // Defines a minumul length for the field
        Validators.maxLength(128)   // Defines a max length for the field
      ])
    ),
    confirmPassword: new FormControl(
      this.formCache.confirmPassword, 
      Validators.required         // The validation for confirm password is defined as the 3. parameter of the FormGorup function
    ),
    birthday: new FormControl(
      this.formCache.birthday, 
      [
        Validators.required, 
        this.ageValidator
      ]
    ),
    first_name: new FormControl(
      this.formCache.first_name, 
      Validators.compose([
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(32)
      ])
    ),
    last_name: new FormControl(
      this.formCache.last_name, 
      Validators.compose([
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(32)
      ])
    )
    gender: new FormControl(
      null,
      Validators.required         // Since this field only have one validator there is no need for the compose function
    ),
  }, this.passwordMatchValidator);

  ageValidator(control: FormControl) { 
    let bDay = control.value; 
    let age = new Date(bDay);
    age = Date.now() - age;
    age = new Date(age);
    age = Math.abs(age.getUTCFullYear() - 1970);
    if(age < 18){
      return { birthday: "You are too young!" };
    }

    return null; 
  }

  // Function used to validate the password and confirm password are equal
  passwordMatchValidator(g: FormGroup) {
   return g.get('password').value === g.get('confirmPassword').value
      ? null : {'mismatch': true};
  }
}
