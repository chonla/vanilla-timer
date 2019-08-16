const timer = Timer();

function setTimerSequence() {
    const dataSet = $(this).attr('aria-dataset').split(',');
    const timeSeq = dataSet.map(n => parseInt(n, 10));    
    timer.set(timeSeq);
}

function startTimer() {
    timer.start();
}

window.onunload = () => {
    timer.stop();
}

function toFriendlyTime(n) {
    const m = n % 60;
    const h = (n - m) / 60;
    const mm = ((m < 10)?'0':'') + m.toString();
    const hh = ((h < 10)?'0':'') + h.toString();
    return `${hh}:${mm}`;
};

Number.prototype.friendly = () => {
    return toFriendlyTime(this);
}

$(() => {
    timer.onChange().subscribe(t => {
        $('#time-left').text(toFriendlyTime(t.tickLeft));
    });
    timer.onEnd().subscribe(_ => console.log('ended'));
    timer.onFinal().subscribe(_ => console.log('finally ended'));

    $('[role="setTimer"]').click(setTimerSequence);
    $('[role="startTimer"]').click(startTimer);
});