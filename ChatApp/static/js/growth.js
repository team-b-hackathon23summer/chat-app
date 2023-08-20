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
const tulipYellow = "/static/img/tulip-yellow.png";

// スコップボタンを押したら、img要素を生成する。連番でクラスを振り管理する
let flowerId = 0;
let flowerPosition = 0;

// 新しいお花が生成される位置の初期値
let flowerBottom = 16;
let flowerLeft = 40;

flowerGenerateTurn = 14;
function FlowerGenerator() {
  flowerGenerateTurn -= 1;
  flowerId += 1;

  if (flowerGenerateTurn > 0) {
    // お花の生成位置をずらす 3remずつの配置がちょうど良い。
    // 一列に8束ほどなので、3 * 8 = 24remプラスとなる...
    flowerLeft += 3;
    if (flowerLeft > 40 + 24) {
      flowerBottom -= 2;
      flowerLeft -= 27;
    }
    // 二段目の生成位置をいい感じにずらします。
    flowerLeft += 3
  }

  const newFlower = document.createElement("img");
  let flowerRect = newFlower.getBoundingClientRect()

  // for(let i = 13; i <= 15; i++) {
  //   flowerBottom = i;
  //   for(let j = 30; j <= 56; j++) {
  //     flowerLeft = j;
  //   }
  // }
  
  // bottom: 13rem ~ 15;
  // left: 30rem ~ 56rem;
  console.log(flowerRect);
  newFlower.classList.add("new-flower", flowerId);
  newFlower.style.bottom = `${flowerBottom}rem`;
  newFlower.style.left = `${flowerLeft}rem`
  newFlower.src = tulipYellow; // 画像パス
  newFlower.alt = "新しいお花"; // 代替テキスト
  newFlower.width = 96; // 横サイズ（px）
  newFlower.height = 96; // 縦サイズ（px）
  flowerBed.parentNode.insertBefore(newFlower, flowerBed);
}
bed.addEventListener("click", FlowerGenerator);

// bed.appendChild(phase5)

console.log(bed);
