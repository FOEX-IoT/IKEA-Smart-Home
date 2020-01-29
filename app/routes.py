from app import app
from flask import render_template

from handler import Handler

handler = Handler("192.168.1.44")


@app.route('/')
@app.route('/index')
def index():
    user = {'username': 'Miguel'}
    return render_template('index.html', title='Home', user=user)
