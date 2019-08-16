const ONE_SECOND = 1000;
const ticker = rxjs.interval(ONE_SECOND);

Timer = function() {
    const t = {
        sub$: 0,
        counter: 0,
        seq: [],
        seqCursor: 0,
        subject: new rxjs.BehaviorSubject({
            tick: 0,
            tickLeft: 0,
            cursor: 0,
            seq: 0
        }),
        endSubject: new rxjs.BehaviorSubject(),
        finallySubject: new rxjs.BehaviorSubject(),
        set: (seq) => {
            t.stop();
            t.seq = seq;
            t.seqCursor = 0;
            t.subject.next({
                tick: 0,
                tickLeft: t.seq[t.seqCursor] - t.counter,
                cursor: t.seqCursor,
                seq: t.seq
            });
        },
        start: () => {
            t.sub$ = ticker.subscribe(_ => {
                ++t.counter;

                t.subject.next({
                    tick: t.counter,
                    tickLeft: t.seq[t.seqCursor] - t.counter,
                    cursor: t.seqCursor,
                    seq: t.seq
                });

                if (t.counter >= t.seq[t.seqCursor]) {
                    t.seqCursor++;
                    t.counter = 0;
                    if (t.seqCursor >= t.seq.length) {
                        t.finallySubject.next();
                        t.reset();
                    } else {
                        t.endSubject.next();
                    }
                }
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
                // t.subject.complete();
                // t.subject = null;
                t.sub$.unsubscribe();
            }
        },
        onChange: () => {
            return t.subject;
        },
        onEnd: () => {
            return t.endSubject;
        },
        onFinal: () => {
            return t.finallySubject;
        },
        sets: () => {
            return t.seq.length;
        }
    };
    return t;
}