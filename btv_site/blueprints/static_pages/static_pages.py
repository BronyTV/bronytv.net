from btv_site.utils import site_revision
from flask import Blueprint, render_template
from datetime import date
from config import *

static_pages = Blueprint("static_pages", __name__, template_folder="../templates")


@static_pages.context_processor
def inject_variables():
    return {"site_revision": site_revision, "current_year": date.today().year, "gCalAPIKey": GOOGLE_CALENDAR_API_KEY, "gCalID": GOOGLE_CALENDAR_ID}


@static_pages.route("/")
def index():
    return render_template("index.html.jinja2")


@static_pages.route("/stream")
def stream():
    return render_template("stream.html.jinja2")

@static_pages.route("/embed")
def embed():
    return render_template("embed.html.jinja2")

@static_pages.route("/chat")
def chat():
    return render_template("chat.html.jinja2")

@static_pages.route("/schedule")
def schedule():
    return render_template("schedule.html.jinja2")

@static_pages.route("/event/<eventID>")
def event(eventID):
    return render_template("event.html.jinja2")

@static_pages.route("/about")
def about():
    return render_template("about.html.jinja2")


@static_pages.route("/rules")
def rules():
    return render_template("rules.html.jinja2")


@static_pages.route("/contact")
def contact():
    return render_template("contact.html.jinja2")
