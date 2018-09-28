import { Component, OnDestroy } from '@angular/core';
import { TimerService } from './services/timer.service';
import { Subscription } from 'rxjs';
import { faPlay, faStop, faTrash, faHistory, faVolumeUp, faVolumeOff } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'timer';
  faPlay = faPlay;
  faStop = faStop;
  faTrash = faTrash;
  faHistory = faHistory;
  faVolumeUp = faVolumeUp;
  faVolumeOff = faVolumeOff;
  faGithub = faGithub;

  public isRunning: boolean;
  private recentlyUsedSecond: number;
  public isMute: boolean;
  private running$: Subscription;
  private sound$: Subscription;

  constructor(private timer: TimerService) {
    this.isRunning = false;
    this.isMute = false;
    this.recentlyUsedSecond = 0;
    this.running$ = this.timer.state().subscribe(s => {
      this.isRunning = s;
    });
    this.sound$ = this.timer.sound().subscribe(s => {
      this.isMute = !s;
    })
  }

  ngOnDestroy() {
    if (this.running$) {
      this.running$.unsubscribe();
    }
    if (this.sound$) {
      this.sound$.unsubscribe();
    }
  }

  startTimer() {
    this.recentlyUsedSecond = this.timer.getInitialTime();
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

  lastUsed() {
    this.timer.setTime(this.recentlyUsedSecond);
  }

  mute() {
    this.timer.mute();
  }

  unmute() {
    this.timer.unmute();
  }

}
