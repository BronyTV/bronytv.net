import json
import requests

from config import *
from btv_site.database import db
from btv_site.models import SiteProperty
from flask import Blueprint, jsonify, request
from requests.exceptions import RequestException
from btv_site.decorators import api_key_required, add_response_headers

api = Blueprint("api", __name__, template_folder="templates")


@api.route("/news")
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
