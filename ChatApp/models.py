import pymysql
from util.DB import DB


class dbConnect:
    def createUser(user):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = "INSERT INTO users (uid, user_name, email, password) VALUES (%s, %s, %s, %s);"
            cur.execute(sql, (user.uid, user.name, user.email, user.password))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()


    def getUserId(email):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = "SELECT uid FROM users WHERE email=%s;"
            cur.execute(sql, (email))
            id = cur.fetchone()
            return id
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()


    def getUser(email):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = "SELECT * FROM users WHERE email=%s;"
            cur.execute(sql, (email))
            user = cur.fetchone()
            return user
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()


    def getChannelAll():
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = "SELECT * FROM channels;"
            cur.execute(sql)
            channels = cur.fetchall()
            return channels
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()


    def getChannelById(cid):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = "SELECT * FROM channels WHERE id=%s;"
            cur.execute(sql, (cid))
            channel = cur.fetchone()
            return channel
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()


    def getChannelByName(channel_name):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = "SELECT * FROM channels WHERE name=%s;"
            cur.execute(sql, (channel_name))
            channel = cur.fetchone()
            return channel
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()


    def addChannel(uid, newChannelName, newChannelDescription):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = "INSERT INTO channels (uid, name, abstract) VALUES (%s, %s, %s);"
            cur.execute(sql, (uid, newChannelName, newChannelDescription))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()


    def getChannelByName(channel_name):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = "SELECT * FROM channels WHERE name=%s;"
            cur.execute(sql, (channel_name))
            channel = cur.fetchone()
        except Exception as e:
            print(e + 'が発生しました')
            abort(500)
        finally:
            cur.close()
            return channel


    def updateChannel(uid, newChannelName, newChannelDescription, cid):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = "UPDATE channels SET uid=%s, name=%s, abstract=%s WHERE id=%s;"
            cur.execute(sql, (uid, newChannelName, newChannelDescription, cid))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しました')
            abort(500)
        finally:
            cur.close()


    #deleteチャンネル関数
    def deleteChannel(cid):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = "DELETE FROM channels WHERE id=%s;"
            cur.execute(sql, (cid))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()


    def getMessageAll(cid):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = "SELECT id,u.uid, user_name, message FROM messages AS m INNER JOIN users AS u ON m.uid = u.uid WHERE cid = %s;"
            cur.execute(sql, (cid))
            messages = cur.fetchall()
            return messages
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()


    def createMessage(uid, cid, message):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = "INSERT INTO messages(uid, cid, message) VALUES(%s, %s, %s)"
            cur.execute(sql, (uid, cid, message))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()


    def deleteMessage(message_id):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = "DELETE FROM messages WHERE id=%s;"
            cur.execute(sql, (message_id))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()


    def getAlarm(uid):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = 'SELECT count(alarm) FROM alarms WHERE uid=%s'
            cur.execute(sql, (uid))
            alarm_count = cur.fetchone()
            if alarm_count == 0:
                alarm_time = "22:00"
                return alarm_time
            else:
                sql = 'SELECT alarm FROM alarms WHERE uid=%s'
                cur.execute(sql, (uid))
                alarm_time = cur.fetchone()
                return alarm_time
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()


    def setAlarm(uid, alarm):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = 'INSERT INTO alarms (uid, alarm) VALUES(%s, %s)'
            cur.execute(sql, (uid, alarm))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()


    def updateAlarm(uid, alarm):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = 'UPDATE alarms SET alarm=%s WHERE uid=%s'
            cur.execute(sql, (alarm, uid))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()


    def deleteAlarm(uid):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = 'DELETE FROM alarms WHERE uid=%s'
            cur.execute(sql, (uid))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()

    def getFlower(cid):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = 'SELECT count(count) FROM flowers WHERE cid=%s'
            cur.execute(sql, (cid))
            flower_columns = cur.fetchone()
            if flower_columns == 0:
                flower_count = 0
                return flower_count
            else:
                sql = 'SELECT count FROM flowers WHERE cid=%s'
                cur.execute(sql, (cid))
                flower_count = cur.fetchone()
                return flower_count
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()

    def setFlower(cid, count):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = 'INSERT INTO flowers (cid, count) VALUES(%s, %s)'
            cur.execute(sql, (cid, count))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()

    def updateFlower(cid, count):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = 'UPDATE flowers SET count=%s WHERE cid=%s'
            cur.execute(sql, (cid, count))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()

    def deleteFlower(cid):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = 'DELETE FROM flowers WHERE cid=%s'
            cur.execute(sql, (cid))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()

    def getFlowerbed(uid):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = 'SELECT count(count) FROM flowerbeds WHERE uid=%s'
            cur.execute(sql, (uid))
            flowerbed_columns = cur.fetchone()
            if flowerbed_columns == 0:
                flowerbed_count = 0
                return flowerbed_count
            else:
                sql = 'SELECT count FROM flowerbeds WHERE uid=%s'
                cur.execute(sql, (uid))
                flowerbed_count = cur.fetchone()
                return flowerbed_count
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()

    def setFlowerbed(uid, count):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = 'INSERT INTO flowerbeds (uid, count) VALUES(%s, %s)'
            cur.execute(sql, (uid, count))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()

    def updateFlowerbed(uid, count):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = 'UPDATE flowerbeds SET count=%s WHERE uid=%s'
            cur.execute(sql, (uid, count))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()

    def deleteFlowerbed(uid):
        try:
            conn = DB.getConnection()
            cur = conn.cursor()
            sql = 'DELETE FROM flowerbeds WHERE uid=%s'
            cur.execute(sql, (uid))
            conn.commit()
        except Exception as e:
            print(e + 'が発生しています')
            abort(500)
        finally:
            cur.close()