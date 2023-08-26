from flask import Flask, request, redirect, render_template, session, flash, abort
from models import dbConnect
from util.user import User
from datetime import timedelta
import hashlib
import uuid
import re
from functools import wraps
from flask_socketio import SocketIO, send, emit
import eventlet.wsgi


app = Flask(__name__)
app.secret_key = uuid.uuid4().hex
app.permanent_session_lifetime = timedelta(days=30)
socketio = SocketIO(app ,cors_allowed_origins='*')

# ログインデコレーター
def login_required(view):
    @wraps(view)
    def inner(*args, **kwargs):
        uid = session.get("uid")
        if uid is None:
            return redirect('/login')
        return view(*args, **kwargs)
    return inner


# サインアップページの表示
@app.route('/signup')
def signup():
    return render_template('registration/signup.html')


# サインアップ処理
@app.route('/signup', methods=['POST'])
def userSignup():
    name = request.form.get('name')
    email = request.form.get('email')
    password1 = request.form.get('password1')
    password2 = request.form.get('password2')

    pattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"

    if name == '' or email =='' or password1 == '' or password2 == '':
        flash('空のフォームがあるようです')
    elif password1 != password2:
        flash('二つのパスワードの値が違っています')
    elif re.match(pattern, email) is None:
        flash('正しいメールアドレスの形式ではありません')
    else:
        uid = uuid.uuid4()
        password = hashlib.sha256(password1.encode('utf-8')).hexdigest()
        user = User(uid, name, email, password)
        DBuser = dbConnect.getUser(email)

        if DBuser != None:
            flash('既に登録されているようです')
        else:
            dbConnect.createUser(user)
            UserId = str(uid)
            session['uid'] = UserId
            return redirect('/')
    return redirect('/signup')


# ログインページの表示
@app.route('/login')
def login():
    return render_template('registration/login.html')


# ログイン処理
@app.route('/login', methods=['POST'])
def userLogin():
    email = request.form.get('email')
    password = request.form.get('password')

    if email =='' or password == '':
        flash('空のフォームがあるようです')
    else:
        user = dbConnect.getUser(email)
        if user is None:
            flash('このユーザーは存在しません')
        else:
            hashPassword = hashlib.sha256(password.encode('utf-8')).hexdigest()
            if hashPassword != user["password"]:
                flash('パスワードが間違っています！')
            else:
                session['uid'] = user["uid"]
                return redirect('/')
    return redirect('/login')


# ログアウト
@app.route('/logout')
def logout():
    session.clear()
    return redirect('/login')


# チャンネル一覧ページの表示
@app.route('/')
@login_required
def index():
    uid = session.get("uid")
    channels = dbConnect.getChannelAll()
    # channels.reverse()
    flowerbed_count = dbConnect.getFlowerbed(uid)
    return render_template('index.html', channels=channels, uid=uid, flowerbed_count=flowerbed_count)


# チャンネルの追加
@app.route('/', methods=['POST'])
@login_required
def add_channel():
    uid = session.get("uid")
    channel_name = request.form.get('channelTitle')
    channel = dbConnect.getChannelByName(channel_name)
    if channel == None:
        channel_description = request.form.get('channelDescription')
        dbConnect.addChannel(uid, channel_name, channel_description)
        return redirect('/')
    else:
        error = '既に同じ名前のチャンネルが存在しています'
        return render_template('error/error.html', error_message=error)

@app.route('/alarm', methods=['POST'])
@login_required
def set_alarm():
    uid = session.get("uid")
    alarm_time = dbConnect.getAlarm(uid)
    set_alarm_time = request.form.get('pets')
    if alarm_time == None:
        dbConnect.setAlarm(uid, set_alarm_time)
        return redirect('/')
    else:
        dbConnect.updateAlarm(uid, set_alarm_time)
        return redirect('/')

"""
# チャンネルの更新
@app.route('/update_channel', methods=['POST'])
@login_required
def update_channel():
    uid = session.get("uid")
    cid = request.form.get('cid')
    channel_name = request.form.get('channelTitle')
    channel_description = request.form.get('channelDescription')

    dbConnect.updateChannel(uid, channel_name, channel_description, cid)
    return redirect('/detail/{cid}'.format(cid = cid))
"""

# チャンネルの削除
@app.route('/delete/<cid>')
@login_required
def delete_channel(cid):
    uid = session.get("uid")
    channel = dbConnect.getChannelById(cid)
    if channel["uid"] != uid:
        flash('チャンネルは作成者のみ削除可能です')
        return redirect ('/')
    else:
        dbConnect.deleteChannel(cid)
        channels = dbConnect.getChannelAll()
        return redirect('/')


# チャンネル詳細ページの表示
@app.route('/detail/<cid>')
@login_required
def detail(cid):
    uid = session.get("uid")
    cid = cid
    channel = dbConnect.getChannelById(cid)
    messages = dbConnect.getMessageAll(cid)
    alarm_time = dbConnect.getAlarm(uid)
    flower_count = dbConnect.getFlower(cid)
    return render_template('detail.html', messages=messages, channel=channel, uid=uid, alarm_time=alarm_time, flower_count=flower_count)

"""
# メッセージの投稿
@app.route('/message', methods=['POST'])
@login_required
def add_message():
    uid = session.get("uid")
    message = request.form.get('message')
    cid = request.form.get('cid')

    if message:
        dbConnect.createMessage(uid, cid, message)

    return redirect('/detail/{cid}'.format(cid = cid))
"""

# メッセージの投稿
@socketio.on('send_message')
def handle_message(data):
    uid = data['uid']
    cid = data['cid']
    message = data['message']

    if message:
        # すべてのクライアントに新しいメッセージを送信
        socketio.emit('message', {'message': message, 'uid': uid, 'cid': cid})

        dbConnect.createMessage(uid, cid, message)


# メッセージの削除
@app.route('/delete_message', methods=['POST'])
@login_required
def delete_message():
    uid = session.get("uid")
    message_id = request.form.get('message_id')
    cid = request.form.get('cid')

    if message_id:
        dbConnect.deleteMessage(message_id)

    return redirect('/detail/{cid}'.format(cid = cid))


@app.errorhandler(404)
def show_error404(error):
    return render_template('error/404.html'),404


@app.errorhandler(500)
def show_error500(error):
    return render_template('error/500.html'),500

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=False)
