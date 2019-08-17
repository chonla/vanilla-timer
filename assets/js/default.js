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
  const mm = ((m < 10) ? '0' : '') + m.toString();
  const hh = ((h < 10) ? '0' : '') + h.toString();
  return `${hh}:${mm}`;
};

Number.prototype.friendly = () => {
  return toFriendlyTime(this);
}

$(() => {
  $('#timer-starter').attr('disabled', 'disabled');

  timer.event().subscribe(e => {
    if (e) {
      switch (e.name) {
        case 'initialized':
          $('#timer-starter').removeAttr('disabled');
          break;
        case 'started':
          $('#timer-starter').attr('disabled', 'disabled');
          break;
        case 'tick':
          $('#time-left').text(toFriendlyTime(e.tickLeft));
          break;
        case 'ended':
          console.log('ended');
          break;
        case 'finally':
          $('#timer-starter').removeAttr('disabled');
          break;
      }
    }
  });

  $('[role="setTimer"]').click(setTimerSequence);
  $('[role="startTimer"]').click(startTimer);
});
