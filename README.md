# Bloom
ハッカソンの初級者コースBチームのアプリです。

**起動方法**
```
docker compose build --no-cache
docker compose up
```
新しいライブラリを入れたので必ずビルドし直してください。
接続先は (自分のIPアドレス):5000 です。
### ディレクトリ構成
```
.
├── ChatApp              # サンプルアプリ用ディレクトリ
│   ├── __init__.py
│   ├── app.py
│   ├── models.py
│   ├── static          # 静的ファイル用ディレクトリ
│   ├── templates       # Template(HTML)用ディレクトリ
│   └── util
├── Docker
│   ├── Flask
│   │   └── Dockerfile # Flask(Python)用Dockerファイル
│   └── MySQL
│       ├── Dockerfile  # MySQL用Dockerファイル
│       ├── init.sql    # MySQL初期設定ファイル
│       └── my.cnf
├── docker-compose.yml   # Docker-composeファイル
├── requirements.txt     # 使用モジュール記述ファイル
└── Bloom.drawio         # ER図
```
