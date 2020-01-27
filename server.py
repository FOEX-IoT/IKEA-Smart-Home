from flask import Flask
from handler import Handler

app = Flask(__name__)

handler = Handler("192.168.1.3")


@app.route('/')
def hello_world():
    return 'Hello, World!'
