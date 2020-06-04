import os
import hmac
import hashlib
import subprocess

from config import *
from .database import db
from .assets import assets
from flask import Flask, request
from flask_session import Session

# Blueprints
from .blueprints import api, admin, static_pages

sio = api.sio
admin.set_api_emit(sio.emit)

os.chdir(APP_BASE)
app = Flask(__name__, static_folder="../static")  # We keep the static folder here to make IDEs happy with paths.
app.config["SQLALCHEMY_DATABASE_URI"] = DB_URL
app.config["SESSION_TYPE"] = "sqlalchemy"
app.config["SESSION_SQLALCHEMY"] = db
app.secret_key = SECRET_KEY

db.init_app(app)
Session(app)
assets.init_app(app)
sio.init_app(app)

app.register_blueprint(static_pages.static_pages, url_prefix="")
app.register_blueprint(admin.admin, url_prefix="/admin")
app.register_blueprint(api.api, url_prefix="/api")


# This is here because there's not really a good place to put it and it doesn't need its own blueprint.
@app.route("/github-update", methods=["POST"])
def github_update():
    h = hmac.new(GITHUB_WEBOOK_SECRET, request.get_data(), hashlib.sha1)
    if h.hexdigest() != request.headers.get("X-Hub-Signature", "")[5:]:  # A timing attack here is nearly impossible.
        return "FAIL"

    try:
        subprocess.Popen("git pull", shell=True).wait()
    except OSError:
        return "ERROR"

    return "OK"
