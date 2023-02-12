import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpoPageComponent } from './pages/add-expo-page/add-expo-page.component';
import { CurrentExposPageComponent } from './pages/current-expos-page/current-expos-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AllExposPageComponent } from './pages/all-expos-page/all-expos-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'current', component: CurrentExposPageComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddExpoPageComponent, canActivate: [AuthGuard] },
  { path: 'all', component: AllExposPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
