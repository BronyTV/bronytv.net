import bcrypt

from btv_site.database import db
from btv_site.models.user import User
from btv_site.utils import site_revision
from btv_site.models.site_property import SiteProperty
from flask import Blueprint, render_template, redirect, session, request, jsonify

admin = Blueprint("admin", __name__, template_folder="../templates")
api_emit = None

def set_api_emit(emit):
    global api_emit
    api_emit = emit

@admin.context_processor
def inject_revision():
    return {"site_revision": site_revision}


@admin.route("/")
def index():
    if "user_id" not in session:
        return redirect("/admin/login")

    user = db.session.query(User).filter(User.id == session["user_id"]).first()

    return render_template("admin/index.html.jinja2", user=user)


@admin.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("admin/login.html.jinja2")

    username, password = request.form.get("username"), request.form.get("password")

    if not username or not password:
        return render_template("admin/login.html.jinja2", error="Username and password must not be blank.")

    user = db.session.query(User).filter(User.username.ilike(username.replace("%", ""))).first()
    if not user or bcrypt.hashpw(password.encode("utf8"), user.password_digest.encode("utf8"))\
            != user.password_digest.encode("utf8"):
        return render_template("admin/login.html.jinja2", error="Invalid username or password.")

    session["user_id"] = user.id
    return redirect("/admin/")


@admin.route("/api/values", methods=["GET", "POST"])
def api_values():
    if "user_id" not in session:
        return jsonify({"error": True, "message": "Forbidden"})

    if request.method == "GET":
        properties = db.session.query(SiteProperty).all()
        return jsonify({"properties": {p.name: p.value for p in properties}})

    properties = request.json["properties"]

    for name, value in properties.iteritems():
        q = db.session.query(SiteProperty).filter(SiteProperty.name == name)
        if q.count() == 0:
            prop = SiteProperty(name=name, value=value)
            db.session.add(prop)
        else:
            q.first().value = value

        db.session.commit()

    if api_emit:
        api_emit("properties", properties)

    return jsonify({"error": False})
