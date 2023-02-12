import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-expo-page',
  templateUrl: './add-expo-page.component.html',
  styleUrls: ['./add-expo-page.component.scss']
})
export class AddExpoPageComponent implements OnInit {
  addExpoForm!: FormGroup;
  allExpos!: Expo[];
  sortedExpos!: Expo[];
  nameExpo!: string;
  descriptionExpo!: string;
  labelExpo!: string;
  dateExpo!: Date;
  todayDate!: string;
  noTodayExpos!: number;

  constructor(private db: AngularFireDatabase, private snackBar: MatSnackBar) { this.getStarted(); }

  ngOnInit(): void {
    //Form initialization
    this.addExpoForm = new FormGroup({
      expoName: new FormControl('', Validators.required),
      expoDescription: new FormControl('', [Validators.required]),
      label: new FormControl('', Validators.required),
      expoDeadline: new FormControl('', Validators.required),
    });

    //Get today's date when opening the page
    let today = new Date();
    this.todayDate =
      today.getDate() +
      '/' +
      (today.getMonth() + 1) +
      '/' +
      today.getFullYear();
  }

  //Function to add expo from the form to the database
  addExpo() {
    if (this.addExpoForm.valid) {
      this.nameExpo = this.addExpoForm.value.expoName;
      this.descriptionExpo = this.addExpoForm.value.expoDescription;
      this.labelExpo = this.addExpoForm.value.label;
      this.dateExpo = this.addExpoForm.value.expoDeadline;

      let addExpoFormData = {
        name: this.nameExpo,
        description: this.descriptionExpo,
        label: this.labelExpo,
        expiration_date:
          this.dateExpo.getDate() +
          '/' +
          (this.dateExpo.getMonth() + 1) +
          '/' +
          this.dateExpo.getFullYear(),
        completed: false,
      };
      this.allExpos.push(addExpoFormData);
      let username = localStorage.getItem('user');
      this.db
        .object('users/' + username + '/expos')
        .set({ expos: this.allExpos });
      this.addExpoForm.reset(
        {
          "label": ""
        }
      );
      this.getStarted();
      this.snackBar.open("Expo added", "OK", {duration: 3000});
    } else {
      return;
    }
  }

  //Function to get the current expos and user info from the database
  async getStarted() {
    var expos: Expo[];
    expos = [];
    await this.getExpos().then((value) => {
      expos = value as Expo[];
    });
    this.allExpos = [...expos];
    expos.sort(compareDate);

    var details: string[];
    details = [];
    await this.getDetails().then((value) => {
      details = value as string[];
    });

    //Check how many expos are done today
    for(let i=0; i<this.allExpos.length; i++)
    {
      if(this.allExpos[i].expiration_date === this.todayDate && !this.allExpos[i].completed)
        this.noTodayExpos=this.noTodayExpos+1;
    }

  }

  //Function to fetch the current expos from the database
  getExpos() {
    return new Promise((resolve, reject) => {
      this.db
        .list('users/' + localStorage.getItem('user') + '/expos/expos')
        .valueChanges()
        .subscribe((value) => {
          resolve(value);
        });
    });
  }

  //Function to fetch the user details from the database
  getDetails() {
    return new Promise((resolve, reject) => {
      this.db
        .list('users/' + localStorage.getItem('user') + '/info')
        .valueChanges()
        .subscribe((value) => {
          resolve(value);
        });
    });
  }


}

//Function to compare dates that is used at array sorting
function compareDate(a: Expo, b: Expo) {
  let expo1 = a.expiration_date.split('/').reverse();
  let expo2 = b.expiration_date.split('/').reverse();

  for (let i = 0; i < 3; i++) {
    if (parseInt(expo1[i]) > parseInt(expo2[i])) return 1;
    else if (parseInt(expo1[i]) < parseInt(expo2[i])) return -1;
  }

  return 0;
}

class Expo {
  name: string | undefined;
  description: string | undefined;
  label: string | undefined;
  expiration_date!: string ;
  completed: boolean | undefined;
}