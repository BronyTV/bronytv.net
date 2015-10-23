import json
import requests

from config import *
from btv_site.database import db
from btv_site.models import PlaylistItem
from btv_site.models import SiteProperty
from flask import Blueprint, jsonify, request
from btv_site.decorators import api_key_required
from requests.exceptions import RequestException


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
def api_properties():
    properties = db.session.query(SiteProperty).all()
    return jsonify({"properties": {p.name: p.value for p in properties}})


@api.route("/playlist", methods=["GET", "POST"])
@api_key_required
def api_playlist():
    if request.method == "POST":
        playlist_items = request.json["playlist"]
        db.session.query(PlaylistItem).delete()
        for item in playlist_items:
            if "id" in item:
                del item["id"]

            db.session.add(PlaylistItem(**item))

        db.session.commit()
        return jsonify({"error": False})

    return jsonify({"playlist": [pl.json() for pl in db.session.query(PlaylistItem).all()]})
