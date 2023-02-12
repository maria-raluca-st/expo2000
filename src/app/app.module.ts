import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddExpoPageComponent } from './pages/add-expo-page/add-expo-page.component';
import { AllExposPageComponent } from './pages/all-expos-page/all-expos-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReminderAlertComponent } from './components/reminder-alert/reminder-alert.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    AddExpoPageComponent,
    AllExposPageComponent,
    LoginPageComponent,
    SignupPageComponent,
    NavigationBarComponent,
    ReminderAlertComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   // provideFirebaseApp(() => initializeApp(environment.firebase)),
   // provideAuth(() => getAuth()),
   // provideDatabase(() => getDatabase()),
   // provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
