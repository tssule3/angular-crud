import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'dashboard/:name', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'forgot', component: ForgotPasswordComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
