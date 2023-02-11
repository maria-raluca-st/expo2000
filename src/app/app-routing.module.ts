import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpoPageComponent } from './pages/add-expo-page/add-expo-page.component';
import { CurrentExposPageComponent } from './pages/current-expos-page/current-expos-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'home', component: HomePageComponent , canActivate: [AuthGuard]},
  { path: 'current', component: CurrentExposPageComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddExpoPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
