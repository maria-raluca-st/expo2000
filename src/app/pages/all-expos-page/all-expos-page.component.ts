import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'all-expos-page',
  templateUrl: './all-expos-page.component.html',
  styleUrls: ['./all-expos-page.component.scss'],
})
export class AllExposPageComponent implements OnInit {
  allExpos!: expo[];
  sortedExpos!: expo[];
  nameExpo!: string;
  descriptionExpo!: string;
  labelExpo!: string;
  dateExpo!: Date;
  todayDate!: string;
  viewExpo!: expo;
  viewMode: boolean = false;
  noExposArt!: number;
  noExposPhoto!: number;
  noExposOther!: number;

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
  ) {
    this.dateAdapter.setLocale('en-GB'); //DD/MM/YYYY
    this.getStarted();
  }

  ngOnInit(): void {

    //Get today date
    let today = new Date();
    this.todayDate =
      today.getDate() +
      '/' +
      (today.getMonth() + 1) +
      '/' +
      today.getFullYear();
  }

  //Retrieve the data of expos and user info
  async getStarted() {
    this.noExposArt = 0;
    this.noExposPhoto = 0;
    this.noExposOther = 0;
    var expos: expo[];
    expos = [];
    await this.getExpos().then((value) => {
      expos = value as expo[];
    });

    var details: string[];
    details = [];
    await this.getDetails().then((value) => {
      details = value as string[];
    });

    this.allExpos = [...expos];
    expos.sort(compareDate);
    this.sortedExpos = expos;

    //Keep the number of active expos with every label
    for (let i = 0; i < this.allExpos.length; i++) {
      if (!this.allExpos[i].completed) {
        switch (this.allExpos[i].label) {
          case "art":
            this.noExposArt = this.noExposArt + 1;
            break;
          case "photo":
            this.noExposPhoto = this.noExposPhoto + 1;
            break;
          case "other":
            this.noExposOther = this.noExposOther + 1;
            break;
        }
      }

    }
  }

  //Fetch the expos from the database
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

  //Fetch the user details from the database
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

  //Function to log out
  logout(): void {
    this.afAuth.signOut();
    localStorage.removeItem('user');
  }


  //Function to check if the expo is not finished
  notExpired(date: string) {
    let dexpo = date.split('/').reverse();
    let dtoday = this.todayDate.split('/').reverse();
    for (let i = 0; i < 3; i++) {
      if (parseInt(dexpo[i]) > parseInt(dtoday[i])) return true;
      else if (parseInt(dexpo[i]) < parseInt(dtoday[i])) return false;
    }

    return true;
  }

  //Function to mark the expo as completed
  MarkCompleted(expo: expo) {
    if (!this.notExpired(expo.expiration_date)) {
      this.DeleteExpo(expo);
    } else {
      let index = this.allExpos.findIndex((obj) => obj == expo);
      let username = localStorage.getItem('user');
      this.db
        .object('users/' + username + '/expos/expos/' + index)
        .update({ completed: true });
      this.getStarted();

    }
  }

  //Function to uncomplete a expo
  MarkNotCompleted(expo: expo) {
    let index = this.allExpos.findIndex((obj) => obj == expo);
    let username = localStorage.getItem('user');
    this.db
      .object('users/' + username + '/expos/expos/' + index)
      .update({ completed: false });
    this.getStarted();
  }


  //Function to delete a expo
  DeleteExpo(expo: expo) {
    let index = this.allExpos.findIndex((obj) => obj == expo);
    let username = localStorage.getItem('user');
    let newexpoArray = [...this.allExpos];
    newexpoArray.splice(index, 1);
    this.db
      .object('users/' + username + '/expos')
      .update({ expos: newexpoArray });
    this.getStarted();
  
  }

  //Function to go to Add expo page
  goToAddExpo() {
    this.router.navigate(['./add']);
  }

  //Function to go to expo view mode
  goToViewMode(expo: expo) {
    this.viewExpo = expo;
    this.viewMode = true;
  }

  //Function to return to view mode from edit mode
  returnViewMode() {

    this.viewMode = true;
  }

  //Function to return to main page from view mode
  returnAllExposPage() {

    this.viewMode = false;
  }
}



//Function to compare two dates that is used for sorting the array
function compareDate(a: expo, b: expo) {
  let expo1 = a.expiration_date.split('/').reverse();
  let expo2 = b.expiration_date.split('/').reverse();

  for (let i = 0; i < 3; i++) {
    if (parseInt(expo1[i]) > parseInt(expo2[i])) return 1;
    else if (parseInt(expo1[i]) < parseInt(expo2[i])) return -1;
  }

  return 0;
}


class expo {
  name: string | undefined;
  description: string | undefined;
  label: string | undefined;
  expiration_date!: string;
  completed: boolean | undefined;
}