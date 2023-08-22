// 各チャンネル詳細ページ内、ページ読み込み時に自動で下までスクロールする
// window.onload = function () {
//   const messageArea = document.getElementById("message-area");
//   messageArea.scrollIntoView(false);
// };


//リロードすると時間差で下にスクロールするように変更
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    const messageArea = document.getElementById("message-area");
    messageArea.scrollTop = messageArea.scrollHeight;
  }, 0);
});