// ジョウロの作動回数が一定回数に達すれば、花が成長する

const bed = document.querySelector(".bed-obj");
const flowerBed = document.querySelector(".flower-bed");

// お花の植え替え回数をidで記録
let flowerId = 0;
let flowerPosition = 0;

// 新しいお花が生成される位置の初期値
let flowerBottom = 16;
let flowerLeft = 40;

// 花壇に咲くお花は、14本まで
let flowerGenerateTurn = 14;

// フラワーストレージのマスターデータ
let flowerStorageMaster;
// フラワーストレージがnullだったら、parseせず、nullを返す。 初回は、nullなので必要。
flowerStorageMaster = JSON.parse(localStorage.getItem("flowers")) ?? ""


function flowerGenerateTurnCounter () {
  if (flowerGenerateTurn > 0) {
    // お花の生成位置をずらす 3remずつの配置がちょうど良い。
    // 一列に8束ほどなので、3 * 8 = 24remプラスとなる...
    flowerLeft += 3;
    if (flowerLeft > 40 + 24) {
      flowerBottom -= 2;
      flowerLeft -= 27;
    }
    // 二段目の生成位置をいい感じにずらします。
    flowerLeft += 3;
  }
}

function flowerGenerator() {
  flowerId += 1;

  // if (flowerGenerateTurn > 0) {
  //   // お花の生成位置をずらす 3remずつの配置がちょうど良い。
  //   // 一列に8束ほどなので、3 * 8 = 24remプラスとなる...
  //   flowerLeft += 3;
  //   if (flowerLeft > 40 + 24) {
  //     flowerBottom -= 2;
  //     flowerLeft -= 27;
  //   }
  //   // 二段目の生成位置をいい感じにずらします。
  //   flowerLeft += 3;
  // }

  // for(let i = 13; i <= 15; i++) {
  //   flowerBottom = i;
  //   for(let j = 30; j <= 56; j++) {
  //     flowerLeft = j;
  //   }
  // }

  // bottom: 13rem ~ 15;
  // left: 30rem ~ 56rem;
  // let flowerRect = newFlower.getBoundingClientRect()
  // console.log(flowerRect);

  console.log(localStorage.getItem("flower"));
  let flower = localStorage.getItem("flower");

  // 現在の植えているお花と新しく植えたお花を保存
  let flowerStorageSlave = [...flowerStorageMaster, flower];
  localStorage.setItem("flowers", JSON.stringify(flowerStorageSlave));
  console.log(flowerStorageSlave);

  // お花の生成回数をストレージに入っているお花の数分減らす。
// for (let i = 0; flowerGenerateTurn >= flowerStorageSlave.length; flowerGenerateTurn--) {
//   console.log(flowerStorageSlave[i-flowerGenerateTurn-1]);
// }

  flowerStorageSlave.map((flower) => {
  flowerGenerateTurn -= 1;
  flowerGenerateTurnCounter()
  const newFlower = document.createElement("img");
  newFlower.classList.add("new-flower", flowerId);
  newFlower.style.bottom = `${flowerBottom}rem`;
  newFlower.style.left = `${flowerLeft}rem`;
  newFlower.src = flower; // 画像パス
  newFlower.alt = "お花"; // 代替テキスト
  newFlower.width = 96; // 横サイズ（px）
  newFlower.height = 96; // 縦サイズ（px）
  flowerBed.parentNode.insertBefore(newFlower, flowerBed);
  console.log(flower);
})
}

// let isRepotting = localStorage.getItem("repottingFlg")

// if (isRepotting) {
//   flowerGenerator()
// }

// 植え替えされているかのフラグ
let rFlg = JSON.parse(localStorage.getItem("repottingFlg"))
let nFlg = JSON.parse(localStorage.getItem("noFlowerFlg"))
let wccc = localStorage.getItem("wateringCanCount")

// bed.addEventListener("click", flowerGenerator)

// ロード時に植え替えフラグがtrue かつ フラワーストレージにお花があれば、花壇に咲かす。

if (nFlg === false) {
  rFlg = true
}

if (rFlg === true && nFlg === false) {
  window.addEventListener('load', flowerGenerator)
  console.log("お花が咲きました");
}

// bed.appendChild(phase5)

// document.addEventListener('DOMContentLoaded',
//   function(e){
//     console.log('DOMツリーの解析が終わりました。');
//   }
// );



/**理想の動作
 * 
 * ロード時に動作
 * フラワーストレージにある分のお花を横方向に生成する。
 * 
 */

