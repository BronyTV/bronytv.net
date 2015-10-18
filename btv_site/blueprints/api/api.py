import json
import requests

from config import *
from btv_site.database import db
from btv_site.models import User
from btv_site.models import PlaylistItem
from btv_site.models import SiteProperty
from requests.exceptions import RequestException
from flask import Blueprint, jsonify, request, Response


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
def api_playlist():
    if request.method == "POST":
        api_key = request.args.get("api_key", "")
        user = db.session.query(User).filter(User.api_key == api_key).first()
        if not user:
            return Response(json.dumps({"error": True, "message": "Invalid API key supplied"}), 403, None,
                            "application/json", "application/json")

        playlist_items = request.json["playlist"]
        db.session.query(PlaylistItem).delete()
        for item in playlist_items:
            if "id" in item:
                del item["id"]

            db.session.add(PlaylistItem(**item))

        db.session.commit()

    return jsonify({"playlist": [pl.json() for pl in db.session.query(PlaylistItem).all()]})
