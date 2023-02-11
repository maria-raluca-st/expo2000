import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn: boolean; // other components can check on this variable for the login status of the user

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {
      // set up a subscription to always know the login status of the user
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
      })
      .catch((error) => {
        if (error.code == 'auth/wrong-password') {
          alert('Wrong password. Please try again!');
        }
        else if (error.code == "auth/user-not-found") {
          alert("User not found. Please try again!")
        }
        else if (error.code == "auth/user-disabled") {
          alert("User disabled. Please try again!")
        }
        else if (error.code == "auth/invalid-email") {
          alert("Invalid email. Please try again!")
        }
        else {
          alert("Login failed. Please try again!");
        }
      });
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();
      })
      .catch((error) => {
        if (error.code == 'auth/account-exists-with-different-credential' || error.code == "auth/email-already-in-use") {
          alert("Email already used. Go to login page!");
        }
        else if (error.code == "auth/invalid-email") {
          alert("Invalid email. Please try again!")
        }
        else {
          alert("Signup failed. Please try again!");
        }
      });
  }
}