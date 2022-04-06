var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player, cueRangeIndex = 0, cueRangeStart = null, inCueRange = false;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '1390',
    width: '1640',
    // This is where you reference the youtube video by the ID
    videoId: 'xtJDLxNJ33U',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  // event.target.playVideo();
  player.addEventListener("onCueRangeEnter", onCueRangeEnter);
  player.addEventListener("onCueRangeExit", onCueRangeExit);
}

function onPlayerStateChange(event) {
  console.log(event);
  if (event.data === 1 && cueRangeStart !== null && !inCueRange)
    event.target.seekTo(cueRangeStart);
}

function stopVideo() {
  player.stopVideo();
}

function onCueRangeEnter(event) {
  console.log("onCueRangeEnter", event);
  // document.getElementById("event").textContent = "Entered Cue Range -> " + event.data + " -> " + event.target.getCurrentTime();
  if (event.data === "range" + cueRangeIndex)
    inCueRange = true;
}

function onCueRangeExit(event) {
  console.log("onCueRangeExit", event);
  // document.getElementById("event").textContent = "Exited Cue Range -> " + event.data + " -> " + event.target.getCurrentTime();
  if (event.data === "range" + cueRangeIndex)
    player.stopVideo();
  if (event.data === "range" + cueRangeIndex)
    inCueRange = false;
}

function addCueRange(name, start, end) {
  player.addCueRange(name, start, end);
}

function removeCueRange(name, start, end) {
  player.removeCueRange(name, start, end);
}

function loadVideoById(videoId, startSeconds, endSeconds) {
  cueRangeStart = startSeconds;
  inCueRange = false;
  document.getElementById("event").textContent = "";
  removeCueRange("range" + cueRangeIndex, startSeconds, endSeconds);
  player.loadVideoById({'videoId': videoId, 'suggestedQuality': 'large'});
  cueRangeIndex++;
  addCueRange("range" + cueRangeIndex, startSeconds, endSeconds);
  player.playVideoAt(startSeconds);
  player.seekTo(startSeconds);
}