import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  firebaseErrorMessage: string;
  public isLoading = false;
  public displayValidationMessage = false;
  activeUser: string | null | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    //Login form initialization
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    
    this.firebaseErrorMessage = '';
    try {
      this.checkAutoLogin();
    } catch {}
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


  ngOnInit(): void {
    
  }

  //When you submit the login form
  onSubmit() {
    //If the form is valid check the data and log in, else return
    if (this.loginForm.invalid) {
      this.displayValidationMessage = true;
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    this.displayValidationMessage = false;
    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        if (result == null) {
          //Create unique username and sign in if the data is in the auth database
          let username = this.loginForm.value.email.replace(/[^a-z0-9]/gi, '');
          localStorage.setItem('user', username);
          this.isLoading = false;
          this.router.navigate(['../all']);
        } else {
          this.isLoading = false;
        }
      });
  }


  //Function to navigate to signup
  switchToSignUp() {
    this.router.navigate(['./signup']);
  }
}