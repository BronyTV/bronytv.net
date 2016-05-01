import json
import requests

from config import *
from btv_site.database import db
from btv_site.models import SiteProperty
from flask import Blueprint, jsonify, request
from requests.exceptions import RequestException
from btv_site.decorators import api_key_required, add_response_headers
import datetime
import urllib

api = Blueprint("api", __name__, template_folder="templates")


@api.route("/news")
@add_response_headers({"Vary": "Accept-Encoding"})
def api_news():
    base_url = "https://api.tumblr.com/v2/blog/btv-news.tumblr.com/posts?api_key=%s&limit=5" % TUMBLR_API_KEY
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
    playlist = request.json["playlist"]
    q = db.session.query(SiteProperty).filter(SiteProperty.name == "playlist")
    if q.count() == 0:
        db.session.add(SiteProperty(name="playlist", value=json.dumps(playlist)))
    else:
        q.first().value = json.dumps(playlist)

    db.session.commit()
    return jsonify({"error": False})


@api.route("/now_streaming", methods=["GET"])
def api_now_streaming_get():
    prop = db.session.query(SiteProperty).filter(SiteProperty.name == "now_streaming").first()
    return jsonify({"now_streaming": prop.value if prop else "Offline"})


@api.route("/now_streaming", methods=["POST"])
@api_key_required
def api_now_streaming_post():
    now_streaming = request.json["now_streaming"]
    q = db.session.query(SiteProperty).filter(SiteProperty.name == "now_streaming")
    if q.count() == 0:
        db.session.add(SiteProperty(name="now_streaming", value=now_streaming))
    else:
        q.first().value = now_streaming

    db.session.commit()
    return jsonify({"error": False})

@api.route("/schedule", methods=["GET"])
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
