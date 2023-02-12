import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  public isLoading = false;
  public displayValidationMessage = false;
  public passValidationMessage = false;
  public submitted=false;
  signupForm!: FormGroup;
  firebaseErrorMessage: string;
  activeUser: string | null | undefined ;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.firebaseErrorMessage = '';
    this.checkAutoLogin();
  }
  
  //If the user did not sign out from the previous session, we skip the login page and directly enter into the account
  async checkAutoLogin() {
    try {
      this.activeUser = (await this.afAuth.currentUser)!.email;
    } catch {}
    if (this.activeUser) {
      this.router.navigate(['../all']);
    }
  }

  //The signup form is initialized
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{6,}$')]),
    });
  }

  //Creates the account if the form and data are valid
  onSubmit() {
    if (this.signupForm.invalid) {
      this.displayValidationMessage = true;
      return;
    }
    this.displayValidationMessage = false;
    this.isLoading = true;
    var formData = {
      name: this.signupForm.value.name,
    };

    this.authService
      .signupUser(this.signupForm.value)
      .then(async (result) => {
        if (result == null)
        {
            let username = this.signupForm.value.email.replace(/[^a-z0-9]/gi, '')
            await this.db.object('users/' + username + '/info').set(formData);
            localStorage.setItem("user", username);
            
            this.router.navigate(['../all']);
        }
        else {
          this.isLoading = false;
        }
      })
      .catch(() => {
        alert('Error');
      });
  }

  //Navigate to login function
  switchToLogin() {
    this.router.navigate(['./login']);
  }
}