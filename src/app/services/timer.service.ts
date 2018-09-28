import { Injectable } from '@angular/core';
import { timer, Subscription, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private oneSec: number = 1000;
  private initialSecond: number = 0;
  private timer$: Subscription;
  private tick: BehaviorSubject<number>;
  private tickCount: number;
  private running: boolean;
  private isRunning: BehaviorSubject<boolean>;
  private audio: HTMLAudioElement;
  private volumeOn: boolean;
  private hasSound: BehaviorSubject<boolean>;

  constructor() {
    this.tickCount = 0;
    this.volumeOn = true;
    this.tick = new BehaviorSubject<number>(0);
    this.isRunning = new BehaviorSubject<boolean>(false);
    this.hasSound = new BehaviorSubject<boolean>(this.volumeOn);
    this.setRunning(false);
    this.audio = new Audio('./assets/sound/mario_game_over.mp3');
    this.audio.load();
  }

  register(): Observable<number> {
    return this.tick.asObservable();
  }

  state(): Observable<boolean> {
    return this.isRunning.asObservable();
  }

  sound(): Observable<boolean> {
    return this.hasSound.asObservable();
  }

  setTime(sec: number) {
    if (!this.running) {
      this.initialSecond = sec;
      this.updateTick();
    }
  }

  setVolume(enable: boolean) {
    this.volumeOn = enable;
  }

  getInitialTime(): number {
    return this.initialSecond;
  }

  increaseSecond() {
    if (!this.running) {
      if (this.initialSecond < 3600) {
        this.initialSecond++;
        this.updateTick();
      }
    }
  }

  increaseMinuteBy(minute: number) {
    if (!this.running) {
      if (this.initialSecond < 3600) {
        this.initialSecond += minute * 60;
        if (this.initialSecond > 3600) {
          this.initialSecond = 3600;
        }
        this.updateTick();
      }
    }
  }

  increaseMinute() {
    this.increaseMinuteBy(1);
  }

  decreaseSecond() {
    if (!this.running) {
      if (this.initialSecond > 0) {
        this.initialSecond--;
        this.updateTick();
      }
    }
  }

  decreaseMinuteBy(minute: number) {
    if (!this.running) {
      if (this.initialSecond > 0) {
        this.initialSecond -= minute * 60;
        if (this.initialSecond < 0) {
          this.initialSecond = 0;
        }
        this.updateTick();
      }
    }
  }

  decreaseMinute() {
    this.decreaseMinuteBy(1);
  }

  updateTick() {
    this.tick.next(this.initialSecond - this.tickCount);
  }

  start() {
    if (!this.running) {
      this.setRunning(true);
      this.tickCount = 0;
      const source = timer(0, this.oneSec);
      this.timer$ = source.subscribe(v => {
        this.tickCount = v;
        this.updateTick();
        if (v >= this.initialSecond) {
          this.end();
          this.reset();
        }
      });
    } else {
      this.reset();
    }
  }

  end() {
    if (this.volumeOn) {
      this.audio.play();
    }
  }

  stop() {
    this.setRunning(false);
    if (this.timer$) {
      this.timer$.unsubscribe();
    }
  }

  reset() {
    this.stop();
    this.tickCount = 0;
    this.updateTick();
  }

  clear() {
    this.initialSecond = 0;
    this.reset();
  }

  setRunning(running: boolean) {
    this.running = running;
    this.isRunning.next(this.running);
  }

  mute() {
    this.setSound(false);
  }

  unmute() {
    this.setSound(true);
  }

  setSound(enable: boolean) {
    this.volumeOn = enable;
    this.hasSound.next(this.volumeOn);
  }
}
