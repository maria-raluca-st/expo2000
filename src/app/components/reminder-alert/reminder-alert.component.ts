import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'reminder-alert',
  templateUrl: './reminder-alert.component.html',
  styleUrls: ['./reminder-alert.component.scss'],
})
export class ReminderAlertComponent implements OnInit {
  @Input() remainingExpos!: number;
  constructor() {}

  ngOnInit(): void {
    this.generateAlerts();
  }

  //Function that checks 1 time per minute if the hour has a notification and give an alert if the check is true
  generateAlerts() {
    setInterval( () => {
      var date = new Date();
      if (date.getHours() == 10 && date.getMinutes() == 0) {
        if(this.remainingExpos>0){
          alert(
            "You can visit " +
              this.remainingExpos +
              'expos that end today!'
          );
        }
      }
    }, 60000);
  }
}