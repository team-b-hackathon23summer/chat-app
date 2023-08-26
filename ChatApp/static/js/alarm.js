const alarm = document.querySelector(".alarm");
const sleep = document.querySelector(".sleep");

let timerId = null;

// アラームを5秒だけ表示
function showAlarm() {
  // alarm.style.display = "block"
  alarm.classList.add("active");
  timerId = setTimeout(closeAlarm, 5000); // タイマーを開始
}

function closeAlarm() {
  alarm.style = "opacity:0";
  setTimeout((e) => {
    //  0.5秒後にクラスactiveを削除
    alarm.classList.remove("active");
    alarm.style = "opacity:1";
    sleep.classList.add("active");
  }, 500);
  clearTimeout(timerId); // タイマーを終了
}

const alarmTime = new Date();
alarmTime.setHours(14, 55, 20, 0);

const currentTime = new Date();
const timeDiff = alarmTime.getTime() - currentTime.getTime();

if (timeDiff > 0) {
  setTimeout(showAlarm, timeDiff);
  // setTimeout(active, timeDiff);
}
