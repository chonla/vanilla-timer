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
      t.eventSubject.next({
        name: 'tick',
        tick: 0,
        tickLeft: t.seq[t.seqCursor] - t.counter,
        cursor: t.seqCursor,
        seq: t.seq
      });
      if (t.seq.length > 0) {
        t.eventSubject.next({
          name: 'initialized'
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
              name: 'finally'
            });
            t.reset();
          } else {
            t.eventSubject.next({
              name: 'ended'
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
      t.sub$.unsubscribe();
    },
    stop: () => {
      if (t.sub$) {
        t.counter = 0;
        t.seq = [];
        t.seqCursor = 0;
        t.sub$.unsubscribe();
      }
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
