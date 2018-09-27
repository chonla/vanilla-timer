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

  constructor() {
    this.tick = new BehaviorSubject<number>(0);
  }

  register(): Observable<number> {
    return this.tick.asObservable();
  }

  setTime(sec: number) {
    this.initialSecond = sec;
  }

  start() {
    const source = timer(this.oneSec, this.oneSec);
    this.timer$ = source.subscribe(v => {
      this.tick.next(this.initialSecond - v);
      if (v >= this.initialSecond) {
        this.stop();
      }
    });
  }

  stop() {
    if (this.timer$) {
      this.timer$.unsubscribe();
    }
  }
}
