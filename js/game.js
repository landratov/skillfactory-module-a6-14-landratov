const numDivs = 36;
const maxHits = 10;

let hits = 0;
let points = 0;
let firstHitTime = 0;

let timer;

function startTimer() {
  let initialTime = new Date();
  timer = setInterval(function() {
    $(".timer").text(Number((new Date() - initialTime) / 1000).toFixed(2));
  }, 1);
}

function round() {
  $(".game-field").removeClass("target");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".game-field").addClass("d-none");

  clearInterval(timer);
  $(".timer").addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toFixed(2);

  if(points == maxHits) {
    $("#total-points").text(points);
  } else {
    $("#total-points").text(points + " (" + (maxHits - points) + " мимо)");
  }
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  $(".game-field").text("");
  $(".game-field").removeClass("miss");

  if ($(event.target).hasClass("target")) {
    hits++;
    points++;
    round();
  } else {
    $(event.target).addClass("miss");
    hits++;
    round();
  }
  
}

function startGame() {
  $("#button-start").addClass("d-none");
  $("#button-reload").removeClass("d-none");
  $(".game-field").click(handleClick);

  firstHitTime = getTimestamp();
  timer = new Date();
  
  round();
}

function reloadGame() {
  hits = 0;
  points = 0;

  $("#win-message").addClass("d-none");
  $(".game-field").text("");
  $(".game-field").removeClass("d-none");
  $(".game-field").removeClass("miss");
  $(".timer").removeClass("d-none");

  firstHitTime = getTimestamp();
  round();
}

function init() {
  $("#button-start").click(function() {
    startGame();
    startTimer();
  });
  $("#button-reload").click(function() {
    reloadGame();
    startTimer();
  });
}

$(document).ready(init);