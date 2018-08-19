
var videos = document.getElementsByTagName("video"),
fraction = 0.5;
var currentTime, startPlayingTime = new Date()

function getVisible(video, window) {
  var x = video.offsetLeft, y = video.offsetTop, w = video.offsetWidth, h = video.offsetHeight, r = x + w, //right
        b = y + h, //bottom
        visibleX, visibleY, visible;


        visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
        visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));
        
        visible = visibleX * visibleY / (w * h);
  return visible
}

function checkScroll(video) {
    visible = getVisible(video, window)

    if (visible > fraction) {
        video.play();
        startPlayingTime = new Date(); 
        console.log('video starts playing')
        return
    } else {
        video.pause();
        continuosPlayingTime = 0
    }
  
}

// log video playtime
function logVideoTime(time) {
  let currentTime = new Date()
  if (Math.abs((currentTime.getTime() - startPlayingTime.getTime()) / 1000).toFixed(0) == 2) {
    console.log('video played for 2 seconds')
  }

  let currentPlayTime = time.currentTime
  let videoDuration = time.duration
  let playTimeRatio = (currentPlayTime / videoDuration).toFixed(2)
  if (playTimeRatio == 0.25) {
    console.log('Video reachs 25% length')
  } 
  if (playTimeRatio == 0.5) {
    console.log('Video reachs 50% length')
  } 
  if (playTimeRatio == 0.75) {
    console.log('Video reachs 75% length')
  }

  return playTimeRatio
}

// the event ended will not be catched in case loop is turned on, therefore a manual loop will triggered in order to catch the end event
function checkVideoEnded() {
  videos[0].addEventListener('ended', function(e) {
    console.log('Video reachs 100% length')
    this.play()
    return
  })
}

window.addEventListener('scroll', checkScroll.bind(this, videos[0], 0.5), false);
window.addEventListener('resize', checkScroll.bind(this, videos[0], 0.5), false);

