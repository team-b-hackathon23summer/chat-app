import pymysql

class DB:
    def getConnection():
        try:
            conn = pymysql.connect(
            host="bloom-chatapp-db.catujmyph2zk.ap-northeast-1.rds.amazonaws.com",
            db="chatapp",
            user="testuser",
            password="testuser",
            charset="utf8",
            cursorclass=pymysql.cursors.DictCursor
        )
            return conn
        except (ConnectionError):
            print("コネクションエラーです")
            conn.close()
