import os

from flask import current_app
from flask.ext.compressor import Compressor, FileAsset, Bundle, Asset, memoized

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

global_css = [UnicodeFileAsset("css/bootstrap.css"), UnicodeFileAsset("css/global.css")]
global_js = [UnicodeFileAsset("js/angular.js"), UnicodeFileAsset("js/angular/common.js"), UnicodeFileAsset("js/header.js")]


def make_css(name, assets):
    return Bundle(name=name, assets=assets, mimetype="text/css", extension="css", processors=["cssmin"],
                  linked_template='<link rel="stylesheet" type="{mimetype}" href="{url}" />')


def make_js(name, assets):
    return Bundle(name=name, assets=assets, mimetype="text/javascript", extension="js", processors=["jsmin"],
                  linked_template='<script type="{mimetype}" src="{url}"></script>')

"""
<script type="text/javascript" src="/static/js/moment.js"></script>
    <script type="text/javascript" src="/static/js/moment-timezone-with-data-2010-2020.js"></script>
    <script type="text/javascript" src="/static/js/humanize-duration.js"></script>
    <script type="text/javascript" src="/static/js/angular-timer.js"></script>
    <script type="text/javascript" src="/static/js/angular/index.js"></script>
    """

compressor.register_bundle(make_css(
    "index_css",
    global_css + [UnicodeFileAsset("css/index.css")]
))

compressor.register_bundle(make_js(
    "index_js",
    global_js + [UnicodeFileAsset("js/moment.js"), UnicodeFileAsset("js/moment-timezone-with-data-2010-2020.js"),
                 UnicodeFileAsset("js/humanize-duration.js"), UnicodeFileAsset("js/angular-timer.js"),
                 UnicodeFileAsset("js/angular/index.js")]
))
