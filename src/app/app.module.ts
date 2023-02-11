import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddExpoPageComponent } from './pages/add-expo-page/add-expo-page.component';
import { AllExposPageComponent } from './pages/all-expos-page/all-expos-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { CurrentExposPageComponent } from './pages/current-expos-page/current-expos-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AddExpoPageComponent,
    AllExposPageComponent,
    LoginPageComponent,
    SignupPageComponent,
    CurrentExposPageComponent,
    HomePageComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
