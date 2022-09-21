import pymysql
from user import User


conn = pymysql.connect(
        host="localhost",
        db="chatapp",
        user="testuser",
        password="testuser",
        charset="utf8",
        cursorclass=pymysql.cursors.DictCursor
        )

class dbConnect:
    def createUser(user):
        cur = conn.cursor()
        sql = "insert into users (uid, user_name, email, password) values (%s, %s, %s, %s);"
        cur.execute(sql, (user.uid, user.name, user.email, user.password))
        conn.commit()


    def getUserId(email):
        cur = conn.cursor()
        sql = "SELECT id FROM users WHERE email=%s;"
        cur.execute(sql, (email))
        id = cur.fetchone()
        cur.close
        return id
    
    def getUser(email):
        cur = conn.cursor()
        sql = "SELECT * FROM users WHERE email=%s;"
        cur.execute(sql, (email))
        user = cur.fetchone()
        cur.close
        return user
    
    # def getUserEmail(password):
    #     cur = conn.cursor()
    #     sql = 'SELECT email FROM users WHERE password = %s'
    #     cur.execute(sql, password)
    #     email = cur.fetchone()
    #     cur.close
    #     return email
    
    # def getUserPassword(email):
    #     cur = conn.cursor()
    #     sql = 'SELECT password FROM users WHERE email = %s'
    #     cur.execute(sql, email)
    #     password = cur.fetchone()
    #     cur.close
    #     return password


    def getChannelAll():
        cur = conn.cursor()
        sql = "select * from channels;"
        cur.execute(sql)
        channels = cur.fetchall()
        cur.close()
        return channels


    def getOneChannel(cid):
        cur = conn.cursor()
        sql = "select * from channels where id=%s;"
        cur.execute(sql, (cid))
        channel = cur.fetchone()
        cur.close()
        return channel

    def addChannel(newChannelName, newChannelDescription):
        cur = conn.cursor()
        sql = "insert into channels (name, abstract) values (%s, %s);"
        cur.execute(sql, (newChannelName, newChannelDescription))
        conn.commit()

    def getMessageAll(cid):
        cur = conn.cursor()
        sql = "select * from messages where cid=%s;"
        cur.execute(sql, (cid))
        messages = cur.fetchall()
        cur.close()
        return messages

    def createMessage(uid, cid, message):
        cur = conn.cursor()
        sql = "INSERT INTO messages(uid, cid, message) VALUES(%s, %s, %s)"
        cur.execute(sql, (uid, cid, message))
        conn.commit()
        cur.close()
    
    # def getUser(uid):
    #     cur = conn.cursor()
    #     sql = "select * from users where uid=%s;"
    #     cur.execute(sql, (uid))
    #     messages = cur.fetchone()
    #     cur.close()
    #     return messages