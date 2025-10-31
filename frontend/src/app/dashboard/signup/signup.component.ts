// import { Component, OnInit } from '@angular/core';
// import {  FormGroup, Validators, FormBuilder } from '@angular/forms';
// import { ApiService } from '../../Service/api.service';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/app/environment/environment';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css'],
// })
// export class SignupComponent implements OnInit {
//   myForm!: FormGroup;

//   constructor(private formbuilder: FormBuilder, private _api: ApiService, private _router : Router, private toastr: ToastrService) {}



//   ngOnInit(): void {
//     this.myForm = this.formbuilder.group({
//       adminName: ['', [Validators.required]],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       cnfpassword: ['', [Validators.required, Validators.minLength(8)]],
//     });
//   }


//   submitForm(): void {
//   if (this.myForm.invalid) {
//     this.toastr.error('Please fill out the form correctly.');
//     return;
//   }

//   const formData = this.myForm.value;

//   if (formData.password !== formData.cnfpassword) {
//     this.toastr.error('Passwords do not match.');
//     return;
//   }

//   this._api.post(`${environment.baseUrl}/register`, formData).subscribe({
//     next: () => {
//       this.toastr.success('Signup successful!');
//       this._router.navigate(['/login']);
//     },
//     error: (err:HttpErrorResponse) => {
//       console.error('Signup error:', err);
//       this.toastr.error('Signup failed. Please try again.');
//     }
//   });
// }
  

// }

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../Service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _api: ApiService,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      adminName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cnfpassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submitForm(): void {
    if (this.myForm.invalid) {
      this.toastr.error('Please fill out all fields correctly.');
      return;
    }

    const formData = this.myForm.value;

    if (formData.password !== formData.cnfpassword) {
      this.toastr.error('Passwords do not match.');
      return;
    }

    this._api.registerUser(formData).subscribe({
      next: (response) => {
        this.toastr.success('Signup successful!');
        this._router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Signup error:', err);
        this.toastr.error('Signup failed. Please try again.');
      }
    });
  }
}
