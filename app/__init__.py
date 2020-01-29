from flask import Flask

app = Flask(__name__,
            static_url_path="",
            static_folder="public/static",
            template_folder="templates")

from app import routes  # nopep8
