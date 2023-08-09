// ジョウロの作動回数が一定回数に達すれば、花が成長する

const growth = document.querySelector(".growth");

// ローカルストレージから、ジョウロの作動回数を取得する。
let getWateringCanCount = Number(localStorage.getItem("wateringCanCount"));

// 花の成長の段階を管理する
const phase1 = "/static/img/growing1.png"
const phase2 = "/static/img/growing2.png";
const phase3 = "/static/img/growing3.png";
const phase4 = "/static/img/growing4.png";
const phase5 = "/static/img/tulip.png";

console.log(growth);
console.log(growth.getAttribute("src"));

// 仮に8の倍数でお花が成長する、とする。

switch (getWateringCanCount) {
  case getWateringCanCount >= 8:
    growth.setAttribute("src", phase2);
    console.log(growth);
    console.log(growth.getAttribute("src"));
    break;
  case getWateringCanCount >= 16:
    growth.setAttribute("src", phase3);
    break;
  case getWateringCanCount >= 24:
    growth.setAttribute("src", phase4);
    break;
  case getWateringCanCount >= 32:
    growth.setAttribute("src", phase5);
    break;

  default:
    let result = growth.setAttribute("src", phase1);
    console.log(getWateringCanCount);
    console.log(growth);
    console.log(growth.getAttribute("src"));
    console.log(result);
    break;
}
