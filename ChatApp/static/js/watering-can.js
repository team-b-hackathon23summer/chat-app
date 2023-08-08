// 画面リロード後にローカルストレージから取得した会話の回数が仮に8の倍数であれば、ジョウロが作動する。
// ジョウロが作動された回数が合計3回であれば、花が成長する ジョウロ作動回数はリセット

// addEventListener("load", )

// let chatCount = localStorage.getItem('count')
// if (chatCount === null) {
//     chatCount = 0
// } else {
//     chatCount++
// }
// localStorage.setItem('count', chatCount)
// console.log(chatCount);

// if (chatCount % 8 === 0) {
//     showWateringCan();
// }

// 花の成長の段階を管理する
// const phase1 = "{{ url_for('static',filename='img/growing1.png') }}"
// const phase2 = "{{ url_for('static',filename='img/growing2.png') }}"
// const phase3 = "{{ url_for('static',filename='img/growing3.png') }}"
// const phase4 = "{{ url_for('static',filename='img/growing4.png') }}"

// 本当は、送信ボタンを押した時にジョウロが作動して欲しかったが、リロードが入るため断念。
// 代わりに会話回数を保持して、会話回数の判定が一定であれば、ジョウロが作動するようにする。
// ジョウロが3回作動すれば、お花の1段階成長する

const wateringCan = document.querySelector(".watering-can");
const scoop = document.querySelector(".scoop");

const wateringCanClick = () => {
    let timerId = null;
  showWateringCan();
};

// ジョウロを5秒だけ表示
function showWateringCan() {
  // alarm.style.display = "block"
  wateringCan.classList.add("active");
  timerId = setTimeout(closeWateringCan, 2000); // タイマーを開始
}

function closeWateringCan() {
//   wateringCan.style = "opacity:0";
    // wateringCan.style = "opacity:1";
  setTimeout((e) => {
    //  0.5秒後にクラスactiveを削除
    wateringCan.classList.remove("active");
    wateringCan.style = "transition: all 2s;"
  }, 1000);
  clearTimeout(timerId); // タイマーを終了
}

scoop.addEventListener("click", wateringCanClick);
