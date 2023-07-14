// detailページ内
// Ctrl/Command ＋ Enter が押された時にフォームを送信する

document.addEventListener("keydown", keydownEvent);

function keydownEvent(e) {
  const newMessageBody = document.newMessageForm.message;
  // uidとチャンネルidが同じ時には
  // 「updateChannelModalにモーダル、updateChannelModalStyleにモーダルのdisplay属性の状態」を格納
  // 違う場合は
  // 「updateChannelModalにnull、updateChannelModalStyleに"none"」を格納
  // nullを入れていないと自分が作成していないチャンネルページ内でエラーになるため
  const updateChannelModal =
    document.getElementById("update-channel-modal") || null;
  let updateChannelModalStyle = "none";

  if (updateChannelModal) {
    updateChannelModalStyle = getComputedStyle(
      updateChannelModal,
      null
    ).getPropertyValue("display");
  }

  if (e.code === "Enter") {
    if (updateChannelModalStyle !== "none") {
      e.preventDefault();
    }
  }

  if (
    ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) &&
    e.keyCode == 13
  ) {
    // Ctrl/Command + Enterが同時押しされた時の処理
    if (e.code === "Enter") {
      // updateモーダルが存在していないページ or updateモーダルはあるが表示されていない時
      if (!updateChannelModal || updateChannelModalStyle === "none") {
        if (newMessageBody.value) {
          e.preventDefault();  // デフォルトの/message送信を防ぐ

          // フォームからメッセージとチャンネルIDを取得
          let message = newMessageBody.value;
          let cid = document.newMessageForm.cid.value;

          // socketを使ってメッセージを送信
          socket.emit('send_message', {message: message, uid: uid, cid: cid});

          // メッセージの入力欄をクリア
          newMessageBody.value = '';
        }
      } else {
        // updateモーダルが表示されている場合はそっちの送信を優先する
        sendUpdateForm();
      }
    }
  }
}
