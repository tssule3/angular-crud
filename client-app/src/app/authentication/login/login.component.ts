import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private _fb: FormBuilder,
    private _authService: AuthenticationService,
    private _router: Router,
    private _toastr: ToastrService) {
    this.loginForm = _fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  login() {
    let data = this.loginForm.value;
    this._authService.login(data).subscribe((data) => {
      console.log('data from login', data);
      if (data['data'] != false) {
        localStorage.setItem('token', data['data']);
        let email = this.loginForm.value.email.split('@')[0];
        console.log('email', email);
        this._toastr.success('User Logged In');
        this._router.navigate([`/dashboard/${email}`]);
      } else {
        console.log('inside');
        // this._router.navigate(['']);
        this._toastr.error(data['message']);
      }
    });
  }
}
