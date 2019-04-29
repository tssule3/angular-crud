import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private _fb: FormBuilder,
    private _authService: AuthenticationService,
    private _router: Router) {
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
     if(data['data'] == true) {
      localStorage.setItem('token', 'loggedin');
      let email = this.loginForm.value.email.split('@')[0];
      console.log('email', email);
      this._router.navigate([`/dashboard/${email}`]);
     }else{
      this._router.navigate(['/']);
     }
    });
  }
}
