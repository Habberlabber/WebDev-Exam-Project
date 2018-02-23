import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'WD-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  // Get the signup data form localstorage if present
  formCache:any = localStorage.signupForm ? JSON.parse(localStorage.signupForm) : null;

  constructor(
    private router: Router
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
      // @TODO send the form to the API! 
      this.router.navigate(['']); // Navigate to the main directory
    }else{
      // If somehow the form gets submitted while invalid show an error notification
      UIkit.notification("<span uk-icon='icon:  warning'></span> The form is not valid!", {status:'danger'});
    }
  }

  // Setting up the form and validators
  signupForm = new FormGroup({
    mail: new FormControl(          // Each input is defined as a new form control
      this.formCache.mail,          // The initial value of the input se set here
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
      Validators.required         // Since this field only have one validator there is no need for the compose function
    ),
    firstname: new FormControl(
      this.formCache.firstname, 
      Validators.compose([
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(32)
      ])
    ),
    lastname: new FormControl(
      this.formCache.lastname, 
      Validators.compose([
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(32)
      ])
    ),
    description: new FormControl(
      this.formCache.description, 
      Validators.compose([
        Validators.required, 
        Validators.minLength(60), 
        Validators.maxLength(255)
      ])
    )
  }, passwordMatchValidator);

  // Function used to validate the password and confirm password are equal
  function passwordMatchValidator(g: FormGroup) {
   return g.get('password').value === g.get('confirmPassword').value
      ? null : {'mismatch': true};
  }
}
