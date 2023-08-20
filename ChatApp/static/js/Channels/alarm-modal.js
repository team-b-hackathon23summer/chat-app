
// チャンネルを登録する時の処理
const alarmModal = document.getElementById("alarm-modal");
const alarmCloseButton = document.getElementById("alarm-close-button");
const alarmConfirmButton = document.getElementById(
  "alarm-confirmation-button"
);

console.log(alarmCloseButton);

// アラーム設定ボタンを付け加える
const alarmLink = document.querySelector(".alarm-link")
alarmLink.appendChild(alarmModal)


// モーダル表示ボタンが押された時にモーダルを表示する
alarmLink.addEventListener("click", () => {
  alarmModal.style.display = "flex";
});

// モーダル内のXボタンが押された時にモーダルを非表示にする
alarmCloseButton.addEventListener("click", () => {
  alarmModal.style.display = "none";
});

// 画面のどこかが押された時にモーダルを非表示にする
addEventListener("click", (e) => {
  if (e.target == alarmModal) {
    alarmModal.style.display = "none";
  }
});

// add-channel-modalが表示されている時に Ctrl/Command + Enterで送信
// Enterで自動送信を防ぐ
// document.addEventListener("keydown", keydownEvent);

// function keydownEvent(e) {
//   const setAlarmTitle = document.setAlarmForm.setAlarmTitle.value;

//   const alarmModal = document.getElementById("alarm-modal");
//   const alarmModalStyle = getComputedStyle(
//     alarmModal,
//     null
//   ).getPropertyValue("display");

//   if (e.code === "Enter") {
//     e.preventDefault();
//   }

//   if (
//     ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) &&
//     e.keyCode == 13
//   ) {
//     if (e.code === "Enter") {
//       if (alarmModalStyle !== "none") {
//         if (setAlarmTitle !== "") {
//           document.setAlarmForm.submit();
//         }
//       }
//     }
//   }
// }
