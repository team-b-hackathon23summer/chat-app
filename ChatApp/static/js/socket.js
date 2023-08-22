// ソケット通信

let socket = io();

socket.on('message', function(data) {
  console.log(data);

  let messageArea = document.getElementById('message-area');

  let messageBox = document.createElement('div');
  if (data.uid === uid) {
    messageBox.className = 'my-messages';
    let messageText = document.createElement('p');
    messageText.className = 'box box-right';
    messageText.textContent = data.message;
    messageBox.appendChild(messageText);
    //deleteボタン追加
    let deleteButton = document.createElement('button');
    deleteButton.className = 'delete-message-btn';
    deleteButton.setAttribute('name', 'message_id');
    deleteButton.value = data.id;

    let icon = document.createElement('ion-icon');
    icon.setAttribute('name', 'trash-bin-outline');
    icon.style.color = '#122543';
    deleteButton.appendChild(icon);
    messageBox.appendChild(deleteButton);
  } else {
    messageBox.className = 'messages';
    let userName = document.createElement('p');
    userName.className = 'user-name';
    userName.textContent = data.user_name;
    let messageText = document.createElement('p');
    messageText.className = 'box box-left';
    messageText.textContent = data.message;
    messageBox.appendChild(userName);
    messageBox.appendChild(messageText);
  }
  messageArea.appendChild(messageBox);

//メッセージが送信されたら、下までスクロール
      setTimeout(function() {
        const messageArea = document.getElementById("message-area");
        messageArea.scrollTop = messageArea.scrollHeight;
    }, 0);
});

document.newMessageForm.onsubmit = function(e) {
  // デフォルトのフォームサブミットを防止する
  e.preventDefault();

  // フォームからメッセージとチャンネルIDを取得
  let message = document.getElementById('message').value;
  let cid = this.cid.value;

  // ソケットを使ってメッセージを送信
  socket.emit('send_message', {message: message, uid: uid, cid: cid});

  // メッセージの入力欄をクリア
  document.getElementById('message').value = '';

}