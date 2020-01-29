from app.api import bp
from flask import jsonify

from handler import Handler

handler = Handler("192.168.1.44")


@bp.route("/get_lights", methods=["GET"])
def get_lights():
    return jsonify(handler.get_lights())


@bp.route("/dim_light", methods=["POST"])
def dim_light():
    return handler.dim_light(light, value)
