// ジョウロの作動回数が一定回数に達すれば、花が成長する

const bed = document.querySelector(".bed-obj");
const flowerBed = document.querySelector(".flower-bed");

// お花の植え替え回数をidで記録
let flowerId = 0;
let flowerPosition = 0;

// 新しいお花が生成される位置の初期値
let flowerBottom = 16;
let flowerLeft = 40;

let flowerGenerateTurn = 14;
function flowerGenerator() {
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
  console.log(localStorage.getItem('flower'));
  let img = localStorage.getItem('flower')
  console.log(flowerRect);
  newFlower.classList.add("new-flower", flowerId);
  newFlower.style.bottom = `${flowerBottom}rem`;
  newFlower.style.left = `${flowerLeft}rem`
  newFlower.src = img; // 画像パス
  newFlower.alt = 'お花'; // 代替テキスト
  newFlower.width = 96; // 横サイズ（px）
  newFlower.height = 96; // 縦サイズ（px）
  flowerBed.parentNode.insertBefore(newFlower, flowerBed);
}

// let isRepotting = localStorage.getItem("repottingFlg")

// if (isRepotting) {
//   flowerGenerator()
// }

scoop.addEventListener("click", flowerGenerator);

// bed.appendChild(phase5)
