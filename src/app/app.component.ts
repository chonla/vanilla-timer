import { Component } from '@angular/core';
import { TimerService } from './services/timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'timer';

  public isRunning: boolean;

  constructor(private timer: TimerService) {
    this.isRunning = false;
    this.timer.state().subscribe(s => {
      this.isRunning = s;
    });
  }

  startTimer() {
    this.timer.start();
  }

  stopTimer() {
    this.timer.stop();
  }

  clearTimer() {
    this.timer.clear();
  }

  addTime(minute: number) {
    this.timer.increaseMinuteBy(minute);
  }

  subtractTime(minute: number) {
    this.timer.decreaseMinuteBy(minute);
  }
}
