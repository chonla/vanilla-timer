const timer = Timer();

function setTimerSequence() {
  const dataSet = $(this).attr('aria-dataset').split(',');
  const timeSeq = dataSet.map(n => parseInt(n, 10));
  timer.set(timeSeq);
}

function startTimer() {
  timer.start();
}

function stopTimer() {
  timer.stop();
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

function drawSlot(count, active) {
  $('#time-slots').empty();
  for (var i = 0; i < count; i++) {
    $('#time-slots').append($('<li class="slot"/>'));
  }
  $(`#time-slots > .slot:nth-child(${active + 1})`).addClass('active');
}

$(() => {
  $('[role="startTimer"]').attr('disabled', 'disabled');
  $('[role="stopTimer"]').attr('disabled', 'disabled');

  timer.event().subscribe(e => {
    if (e) {
      switch (e.name) {
        case 'initialized':
          $('[role="startTimer"]').removeAttr('disabled');
          $('[role="stopTimer"]').attr('disabled', 'disabled');
          $('#time-left').text(toFriendlyTime(e.tickLeft));
          drawSlot(e.seq.length, 0);
          break;
        case 'started':
          $('[role="startTimer"]').attr('disabled', 'disabled');
          $('[role="stopTimer"]').removeAttr('disabled');
          break;
        case 'tick':
          $('#time-left').text(toFriendlyTime(e.tickLeft));
          break;
        case 'stopped':
          $('#time-left').text(toFriendlyTime(e.tickLeft));
          drawSlot(e.seq.length, 0);
          $('[role="startTimer"]').removeAttr('disabled');
          $('[role="stopTimer"]').attr('disabled', 'disabled');
          break;
        case 'ended':
          drawSlot(e.seq.length, e.cursor);
          break;
        case 'finally':
          drawSlot(e.seq.length, e.cursor);
          $('[role="startTimer"]').removeAttr('disabled');
          $('[role="stopTimer"]').attr('disabled', 'disabled');
          break;
      }
    }
  });

  $('[role="setTimer"]').click(setTimerSequence);
  $('[role="startTimer"]').click(startTimer);
  $('[role="stopTimer"]').click(stopTimer);
});
