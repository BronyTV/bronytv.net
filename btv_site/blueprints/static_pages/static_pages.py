from flask import Blueprint, render_template

static_pages = Blueprint("static_pages", __name__, template_folder="templates")


@static_pages.route("/")
def index():
    return render_template("index.html.jinja2")


@static_pages.route("/stream")
def stream():
    return render_template("stream.html.jinja2")


@static_pages.route("/about")
def about():
    return render_template("about.html.jinja2")


@static_pages.route("/rules")
def rules():
    return render_template("rules.html.jinja2")


@static_pages.route("/contact")
def contact():
    return render_template("contact.html.jinja2")
