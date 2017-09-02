import json
import requests

from config import *
from btv_site.database import db, cache
from btv_site.models import SiteProperty, StreamViewer
from flask import Blueprint, jsonify, request, session, url_for, redirect
from requests.exceptions import RequestException
from btv_site.decorators import api_key_required, add_response_headers, cached
import time
import datetime
import urllib
import random
import string

api = Blueprint("api", __name__, template_folder="templates")

def write_property(pname, pvalue):
    q = db.session.query(SiteProperty).filter(SiteProperty.name == pname)
    if q.count() == 0:
        db.session.add(SiteProperty(name=pname, value=pvalue))
    else:
        q.first().value = pvalue


@api.route("/news")
@add_response_headers({"Vary": "Accept-Encoding"})
@cached(timeout=300)
def get_news():
    base_url = "https://api.tumblr.com/v2/blog/btv-news.tumblr.com/posts?api_key=%s&limit=7" % TUMBLR_API_KEY
    posts = []
    try:
        res = requests.get(base_url)
        j = json.loads(res.text)
        if "response" in j and "posts" in j["response"]:
            posts = j["response"]["posts"]
    except KeyError:  # Invalid response for some reason
        pass
    except RequestException:  # Request somehow failed
        pass

    return jsonify(posts=posts)

@api.route("/tumblr_primaryblog_name/<user>") #This api takes in a tumblr username and get their primary blog's name. Sorry I cant do this in JS.
def tumblr_primaryblog_name(user):
    cached = cache.get("blog_name/%s" % user)
    if cached is not None:
        return cached
    base_url = "https://api.tumblr.com/v2/blog/{}.tumblr.com/info?api_key={}".format(user, TUMBLR_API_KEY)
    try:
        res = requests.get(base_url)
        j = json.loads(res.text)
        name = j["response"]["blog"]["title"]
        cache.set("blog_name/%s" % user, name)
        return name
    except KeyError:  # Invalid response for some reason
        pass
    except RequestException:  # Request somehow failed
        pass


@api.route("/properties")
@add_response_headers({"Vary": "Accept-Encoding"})
def api_properties():
    properties = db.session.query(SiteProperty).all()
    return jsonify({"properties": {p.name: p.value for p in properties}})


@api.route("/playlist", methods=["GET"])
@add_response_headers({"Vary": "Accept-Encoding"})
def api_playlist_get():
    prop = db.session.query(SiteProperty).filter(SiteProperty.name == "playlist").first()
    return jsonify({"playlist": json.loads(prop.value) if prop else []})


@api.route("/playlist", methods=["POST"])
@api_key_required
def api_playlist_post():
    write_property("playlist", json.dumps(request.json["playlist"]))
    db.session.commit()
    return jsonify({"error": False})


@api.route("/now_streaming", methods=["GET"])
@cached(timeout=5)
def api_now_streaming_get():
    prop = db.session.query(SiteProperty).filter(SiteProperty.name == "now_streaming").first()
    return jsonify({"now_streaming": prop.value if prop else "Offline"})


@api.route("/now_streaming", methods=["POST"])
@api_key_required
def api_now_streaming_post():
    write_property("now_streaming", request.json["now_streaming"])
    db.session.commit()
    return jsonify({"error": False})


@api.route("/raribox", methods=["GET"])
def api_raribox_get():
    image_url = db.session.query(SiteProperty).filter(SiteProperty.name == "raribox_image_url").first()
    text = db.session.query(SiteProperty).filter(SiteProperty.name == "raribox_text").first()
    return jsonify({"image_url": image_url.value if image_url else "", "text": text.value if text else ""})


@api.route("/raribox", methods=["POST"])
@api_key_required
def api_raribox_post():
    if "image_url" in request.json:
        write_property("raribox_image_url", request.json["image_url"])
    if "text" in request.json:
        write_property("raribox_text", request.json["text"])

    db.session.commit()
    return jsonify({"error": False})

def get_viewercount():
    time_past = (datetime.datetime.now() - datetime.timedelta(seconds = 10)).strftime('%Y-%m-%d %H:%M:%S')
    viewerquery = db.session.query(StreamViewer).filter(StreamViewer.timestamp > time_past).all()
    return len(viewerquery)

@api.route("/viewercount", methods=["GET"])
def api_viewercount_get():
    return jsonify(viewercount=get_viewercount())

@api.route("/viewercount", methods=["POST"])
def api_viewercount_post():
    if "unique_viewercount_id" not in session:
        session["unique_viewercount_id"] = ''.join([random.choice(string.ascii_letters + string.digits) for n in xrange(32)])
    viewerquery = StreamViewer.query.filter_by(unique=session["unique_viewercount_id"]).first()
    time_now = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')
    if viewerquery is None:
        viewer = StreamViewer(session["unique_viewercount_id"], time_now)
        db.session.add(viewer)
        db.session.commit()
    else:
        viewerquery.timestamp = time_now
        db.session.commit()
    return jsonify(viewercount=get_viewercount())


@api.route("/schedule", methods=["GET"])
@cached(timeout=300, requestvals=["tzoffset", "offsettoday", "maxresults"])
def api_schedule_get():
    tzoffset = urllib.quote_plus(request.args.get('tzoffset', "-08:00")).replace("+", "%2B") #Pacific Standard Time for the win
    offsettoday = int(float(str(request.args.get('offsettoday', 0))))
    maxresults = request.args.get('maxresults', 250)

    if offsettoday == 1:
        timenow = urllib.quote_plus(str(datetime.datetime.now().isoformat("T"))) + tzoffset
        base_url = "https://www.googleapis.com/calendar/v3/calendars/{}/events?maxResults={}&orderBy=startTime&singleEvents=true&timeMin={}&timeZone=UTC{}&key={}".format(GOOGLE_CALENDAR_ID, maxresults, timenow, tzoffset, GOOGLE_CALENDAR_API_KEY)
    else:
        base_url = "https://www.googleapis.com/calendar/v3/calendars/{}/events?maxResults={}&orderBy=startTime&singleEvents=true&timeZone=UTC{}&key={}".format(GOOGLE_CALENDAR_ID, maxresults, tzoffset, GOOGLE_CALENDAR_API_KEY)
    events = []
    try:
        res = requests.get(base_url)
        j = json.loads(res.text)
        if "items" in j:
            events = j["items"]
    except KeyError:  # Invalid response for some reason
        pass
    except RequestException:  # Request somehow failed
        pass
    return jsonify(events=events)

@api.route("/event", methods=["GET"])
@cached(timeout=300, requestvals=["tzoffset", "eventid"])
def api_event_get():
    tzoffset = urllib.quote_plus(request.args.get('tzoffset', "-08:00")).replace("+", "%2B") #Pacific Standard Time for the win
    eventid = request.args.get('eventid', 0)

    base_url = "https://www.googleapis.com/calendar/v3/calendars/{}/events/{}?timeZone=UTC{}&key={}".format(GOOGLE_CALENDAR_ID, eventid, tzoffset, GOOGLE_CALENDAR_API_KEY)
    try:
        res = requests.get(base_url)
        j = json.loads(res.text)
    except KeyError:  # Invalid response for some reason
        pass
    except RequestException:  # Request somehow failed
        pass
    return jsonify(events=j)
