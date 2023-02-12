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
      if (date.getHours() == 18 && date.getMinutes() == 52) {
        if(this.remainingExpos>0){
          alert(
            "You could visit " +
              this.remainingExpos +
              ' galleries today!'
          );
        }
      }
    }, 60000);
  }
}