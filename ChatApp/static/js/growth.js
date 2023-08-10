// ジョウロの作動回数が一定回数に達すれば、花が成長する

// const growth = document.querySelectorAll(".growth");
// console.log(growth[0]);

// ローカルストレージから、ジョウロの作動回数を取得する。
let getWateringCanCount = Number(localStorage.getItem("wateringCanCount"));

// 花の成長の段階を管理する
const phase1 = "/static/img/growing1.png";
const phase2 = "/static/img/growing2.png";
const phase3 = "/static/img/growing3.png";
const phase4 = "/static/img/growing4.png";
const phase5 = "/static/img/tulip.png";

// console.log(growth);
// console.log(growth.getAttribute("src"));

// 仮に8の倍数でお花が成長する、とする。

// switch (getWateringCanCount) {
//   case getWateringCanCount >= 8:
//     growth.setAttribute("src", phase2);
//     console.log(growth);
//     console.log(growth.getAttribute("src"));
//     break;
//   case getWateringCanCount >= 16:
//     growth.setAttribute("src", phase3);
//     break;
//   case getWateringCanCount >= 24:
//     growth.setAttribute("src", phase4);
//     break;
//   case getWateringCanCount >= 32:
//     growth.setAttribute("src", phase5);
//     break;

//   default:
//     growth.setAttribute("src", phase1);
//     console.log(getWateringCanCount);
//     console.log(growth);
//     console.log(growth.getAttribute("src"));
//     console.log(getAttribute(growth));
//     break;
// }

// スコップボタンを押したら、お花をホームの花壇に植え替える機能
const bed = document.querySelector(".bed-obj");
const flowerBed = document.querySelector(".flower-bed");

// スコップボタンを押したら、img要素を生成する。連番でクラスを振り管理する
let flowerId = 0;
let flowerPosition = 0;

let centerX = document.documentElement.clientWidth / 2;
let centerY = document.documentElement.clientHeight / 2;

let elem = document.elementFromPoint(centerX, centerY);

elem.style.background = "red";
alert(elem.tagName);

// // 要素のドキュメント座標を取得
// function getCoords(elem) {
//   let box = elem.getBoundingClientRect();

//   return {
//     top: box.top + pageYOffset,
//     left: box.left + pageXOffset,
//   };
// }

// getCoords()

window.addEventListener('load', function(){
    bed.addEventListener('click', logPosition);
});

function logPosition(event) {
    console.log("screenX: " + event.screenX);
    console.log("screenY: " + event.screenY);
}

let clientRect = bed.getBoundingClientRect();
console.log(clientRect);

function FlowerGenerator() {
  flowerId += 1;

  const newFlower = document.createElement("img");
  newFlower.classList.add("new-flower", flowerId);
  newFlower.src = phase5; // 画像パス
  newFlower.alt = "新しいお花"; // 代替テキスト
  newFlower.width = 96; // 横サイズ（px）
  newFlower.height = 96; // 縦サイズ（px）
  flowerBed.parentNode.insertBefore(newFlower, flowerBed);
}
bed.addEventListener("click", FlowerGenerator);

// bed.appendChild(phase5)

console.log(bed);
