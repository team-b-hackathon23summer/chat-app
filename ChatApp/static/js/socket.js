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
    // let deleteButton = document.createElement('');
    // deleteButton.className = 'delete-message-button';
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