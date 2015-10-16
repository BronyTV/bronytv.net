import json
import requests

from config import *
from btv_site.database import db
from flask import Blueprint, jsonify
from btv_site.models import SiteProperty
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
def api_playlist():
    return jsonify({"playlist": [
        {"name": "Test", "link": "http://test.com/"},
        {"name": "Other Test", "link": None},
        {"name": "Moar Stuff", "link": "http://test.com/"}
    ]})
