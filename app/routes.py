from app import app
from flask import render_template


@app.route('/')
@app.route('/index')
def index():
    return app.send_static_file('index.html')
