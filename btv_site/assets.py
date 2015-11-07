import os

from flask import current_app
from flask.ext.compressor import Compressor, Bundle, Asset, memoized

compressor = Compressor()


class UnicodeFileAsset(Asset):
    def __init__(self, filename, *args, **kwargs):
        self.filename = filename
        super(UnicodeFileAsset, self).__init__(None, *args, **kwargs)

    @property
    @memoized
    def raw_content(self):
        abs_path = os.path.join(current_app.static_folder, self.filename)

        with open(abs_path) as handle:
            self._raw_content = handle.read().decode("utf-8")

        return self._raw_content

    @property
    def name(self):
        """ The asset is identified by the filename """
        return self.filename

global_css = [UnicodeFileAsset("css/vendor/bootstrap.css"), UnicodeFileAsset("css/global.css")]
global_js = [UnicodeFileAsset("js/vendor/angular.js"), UnicodeFileAsset("js/angular/common.js"),
             UnicodeFileAsset("js/header.js")]


def make_css(name, assets):
    return Bundle(name=name, assets=assets, mimetype="text/css", extension="css", processors=["cssmin"],
                  linked_template='<link rel="stylesheet" type="{mimetype}" href="{url}" />')


def make_js(name, assets):
    return Bundle(name=name, assets=assets, mimetype="text/javascript", extension="js", processors=["jsmin"],
                  linked_template='<script type="{mimetype}" src="{url}"></script>')

compressor.register_bundle(make_css(
    "index_css",
    global_css + [UnicodeFileAsset("css/index.css")]
))

compressor.register_bundle(make_js(
    "index_js",
    global_js + [UnicodeFileAsset("js/vendor/moment.js"), UnicodeFileAsset("js/vendor/moment-timezone-with-data-2010-2020.js"),
                 UnicodeFileAsset("js/vendor/humanize-duration.js"), UnicodeFileAsset("js/vendor/angular-timer.js"),
                 UnicodeFileAsset("js/angular/index.js")]
))

compressor.register_bundle(make_css(
    "stream_css",
    global_css + [UnicodeFileAsset("css/vendor/video-js.min.css"), UnicodeFileAsset("css/stream.css")]
))

compressor.register_bundle(make_js(
    "stream_js",
    global_js + [UnicodeFileAsset("js/vendor/angular-animate.js"), UnicodeFileAsset("js/vendor/video.min.js"),
                 UnicodeFileAsset("js/angular/stream.js")]
))

compressor.register_bundle(make_css(
    "about_css",
    global_css
))

compressor.register_bundle(make_js(
    "about_js",
    global_js + [UnicodeFileAsset("js/angular/about.js")]
))

compressor.register_bundle(make_css(
    "rules_css",
    global_css
))

compressor.register_bundle(make_js(
    "rules_js",
    global_js + [UnicodeFileAsset("js/angular/rules.js")]
))

compressor.register_bundle(make_css(
    "contact_css",
    global_css
))

compressor.register_bundle(make_js(
    "contact_js",
    global_js
))

compressor.register_bundle(make_css(
    "admin_index_css",
    global_css + [UnicodeFileAsset("css/admin/index.css")]
))

compressor.register_bundle(make_js(
    "admin_index_js",
    global_js + [UnicodeFileAsset("js/angular/admin/index.js")]
))

compressor.register_bundle(make_css(
    "admin_login_css",
    global_css + [UnicodeFileAsset("css/admin/login.css")]
))
