import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private _fb: FormBuilder,
    private _authService: AuthenticationService,
    private _router: Router,
    private _toastr: ToastrService) {
    this.registerForm = _fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
  }

  register() {
    let data = this.registerForm.value;
    this._authService.register(data).subscribe((data) => {
      if (data['token']) {
        console.log('data from register', data);
        localStorage.setItem('token', data.token);
        let email = this.registerForm.value.email.split('@')[0];
        console.log('email', email);
        this._toastr.success('User Registered');
        this._router.navigate([`/dashboard/${email}`]);
      } else {
        this._toastr.error(data['message']);
      }
    });
  }
}
