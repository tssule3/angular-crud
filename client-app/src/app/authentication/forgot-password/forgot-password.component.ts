import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  constructor(private _fb: FormBuilder,
    private _authService: AuthenticationService,
    private _toastr: ToastrService,
    private _router: Router) {
    this.forgotForm = _fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {
  }
  forgot() {
    let data = this.forgotForm.value.email;
    console.log('data', data);
    this._authService.forgotPassword(data).subscribe((data) => {
      console.log('data', data);
      if(data['message']=='Email DoesNot Exist!'){
        this._toastr.warning(data['message']);
      }else{
        this._toastr.success(data['message']);
        this._router.navigate(['']);
      }
    });
  }
}
