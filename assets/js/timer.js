const ONE_SECOND = 1000;
const ticker = rxjs.interval(ONE_SECOND);

Timer = function () {
  const t = {
    sub$: 0,
    counter: 0,
    seq: [],
    seqCursor: 0,
    eventSubject: new rxjs.BehaviorSubject({}),
    set: (seq) => {
      t.stop();
      t.seq = seq;
      t.seqCursor = 0;
      if (t.seq.length > 0) {
        t.eventSubject.next({
          name: 'initialized',
          tick: 0,
          tickLeft: t.seq[t.seqCursor] - t.counter,
          cursor: t.seqCursor,
          seq: t.seq
        });
      }
    },
    start: () => {
      t.sub$ = ticker.subscribe(_ => {
        ++t.counter;

        t.eventSubject.next({
          name: 'tick',
          tick: t.counter,
          tickLeft: t.seq[t.seqCursor] - t.counter,
          cursor: t.seqCursor,
          seq: t.seq
        });

        if (t.counter >= t.seq[t.seqCursor]) {
          t.seqCursor++;
          t.counter = 0;
          if (t.seqCursor >= t.seq.length) {
            t.eventSubject.next({
              seq: t.seq,
              cursor: 0,
              name: 'finally'
            });
            t.stop();
          } else {
            t.eventSubject.next({
              name: 'ended',
              seq: t.seq,
              cursor: t.seqCursor
            });
          }
        }
      });
      t.eventSubject.next({
        name: 'started'
      });
    },
    reset: () => {
      t.counter = 0;
      t.seqCursor = 0;
      t.seq = [];
      t.sub$.unsubscribe();
    },
    stop: () => {
      if (t.sub$) {
        t.counter = 0;
        t.seqCursor = 0;
        t.sub$.unsubscribe();
      }
      t.eventSubject.next({
        seq: t.seq,
        cursor: 0,
        tick: t.counter,
        tickLeft: t.seq[t.seqCursor] - t.counter,
        name: 'stopped'
      });
    },
    pause: () => {
      if (t.sub$) {
        t.sub$.unsubscribe();
      }
      t.eventSubject.next({
        seq: t.seq,
        cursor: 0,
        tick: t.counter,
        tickLeft: t.seq[t.seqCursor] - t.counter,
        name: 'paused'
      });
    },
    event: () => {
      return t.eventSubject;
    },
    sets: () => {
      return t.seq.length;
    }
  };
  return t;
}
