from flask import Flask

app = Flask(__name__,
            static_url_path="",
            static_folder="public/static",
            template_folder="templates")

from app.api import bp as api_bp  # nopep8

app.register_blueprint(api_bp, url_prefix="/api")

from app import routes  # nopep8
