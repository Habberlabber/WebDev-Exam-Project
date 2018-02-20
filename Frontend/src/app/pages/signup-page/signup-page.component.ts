import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'WD-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  signupForm: FormGroup; // Defien the formgroup

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.signupForm = this.fb.group({
      mail: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(128)])]
      passwordRepeat: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(128)])],
      birthday: ['', Validators.required],
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(60), Validators.maxLength(255)])]
    });
  }
}
