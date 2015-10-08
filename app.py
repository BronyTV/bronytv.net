#!/usr/bin/env python3
import json
import requests

from flask import Flask, render_template, jsonify, Response

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html.jinja2")

@app.route("/api/news")
def api_news():
    base_url = "https://api.tumblr.com/v2/blog/btv-news.tumblr.com/posts?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4&limit=5"
    posts = []
    try:
        res = requests.get(base_url)
        j = json.loads(res.text)
        if "response" in j and "posts" in j["response"]:
            posts = j["response"]["posts"]
    except Exception as e:
        pass

    return jsonify(posts=posts)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)