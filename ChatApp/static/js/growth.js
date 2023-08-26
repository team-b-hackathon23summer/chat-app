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

const growth = document.querySelector(".growth");

// 花の成長の段階を管理する
const phase1 = "/static/img/growing1.png";
const phase2 = "/static/img/growing2.png";
const phase3 = "/static/img/growing3.png";
const phase4 = "/static/img/growing4.png";

const redFlower = "/static/img/tulip-red.png";
const orangeFlower = "/static/img/tulip-orange.png";
const pinkFlower = "/static/img/tulip-pink.png";
const yellowFlower = "/static/img/tulip-yellow.png";
const purpleFlower = "/static/img/tulip-purple.png";

// 植木鉢付きのお花と植木鉢なしのお花を管理
flowerImgs = [
  {
    "/static/img/tulip-red.png": "/static/img/tulip-red-normal.png",
  },
  {
    "/static/img/tulip-orange.png": "/static/img/tulip-orange-normal.png",
  },
  {
    "/static/img/tulip-pink.png": "/static/img/tulip-pink-normal.png",
  },
  {
    "/static/img/tulip-yellow.png": "/static/img/tulip-yellow-normal.png",
  },
  {
    "/static/img/tulip-purple.png": "/static/img/tulip-purple-normal.png",
  },
];

const random = Math.floor(Math.random() * flowerImgs.length);

const flowerKey = flowerImgs[random]



// 本当は、送信ボタンを押した時にジョウロが作動して欲しかったが、リロードが入るため断念。
// 代わりに会話回数を保持して、会話回数の判定が一定であれば、ジョウロが作動するようにする。
// ジョウロが3回作動すれば、お花の1段階成長する

// ジョウロの作動回数をローカルストレージで保持するためのカウント
let wateringCanCount = 0;

const wateringCan = document.querySelector(".watering-can");

function flowerGrowth() {
  noFlowerFlg = true
  // ローカルストレージから、ジョウロの作動回数を取得する。
  let getWateringCanCount = Number(localStorage.getItem("wateringCanCount"));
  console.log(getWateringCanCount);
  if (getWateringCanCount >= 1 && getWateringCanCount < 2) {
    growth.src = phase2;
    console.log(growth.src);
  } else if (getWateringCanCount >= 2 && getWateringCanCount < 3) {
    growth.src = phase3;
    console.log(growth.src);
  } else if (getWateringCanCount >= 3 && getWateringCanCount < 4) {
    growth.src = phase4;
    console.log(growth.src);
  } else if (getWateringCanCount >= 4) {
    growth.src = Object.keys(flowerKey)
    scoopImg.style.display = "block";
  } else {
    growth.src = phase1;
  }
}

function wateringCanClick () {
  if (wateringCanCount > 5 && noFlowerFlg === false) {
    wateringCanCount = 0
    repottingFlg = false
    growth.src = phase1;
  }
  let timerId = null;
  showWateringCan();
  wateringCanCount++;
  localStorage.setItem("wateringCanCount", wateringCanCount);
  // flowerGrowth();
};

// ジョウロを5秒だけ表示
function showWateringCan() {
  // alarm.style.display = "block"
  wateringCan.classList.add("active");
  timerId = setTimeout(closeWateringCan, 2000); // タイマーを開始
  flowerGrowth();
}

function closeWateringCan() {
  //   wateringCan.style = "opacity:0";
  // wateringCan.style = "opacity:1";
  setTimeout((e) => {
    //  0.5秒後にクラスactiveを削除
    wateringCan.classList.remove("active");
    wateringCan.style = "transition: all 2s;";
  }, 1000);
  clearTimeout(timerId); // タイマーを終了
}

const addMessageBtn = document.getElementById("add-message-btn");
addMessageBtn.addEventListener("click", wateringCanClick);

// スコップボタンを押したら、お花をホームの花壇に植え替える機能

const scoop = document.querySelector(".scoop");
const scoopImg = document.querySelector(".scoop-img");

let repottingFlg = false;
let noFlowerFlg = true
// fs -> フラワーストレージ
let fs = []
fs = JSON.parse(localStorage.getItem("flowers"))
console.log(fs);
function repotting() {
  repottingFlg = true;
  noFlowerFlg = false;
  localStorage.setItem("repottingFlg", repottingFlg)
  localStorage.setItem("noFlowerFlg", noFlowerFlg)
  localStorage.setItem("flower", Object.values(flowerKey));
  // localStorage.setItem("wateringCanCount", 0)
  growth.src = phase1;
  scoopImg.style = "box-shadow: none";
  wateringCanCount = 0;
  localStorage.setItem("wateringCanCount", 0);
}

scoop.addEventListener("click", repotting);
