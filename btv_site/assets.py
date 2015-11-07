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


def register_all(lst):
    for asset_type, bundle_name, asset_files in lst:
        if isinstance(asset_files, str):
            asset_files = [asset_files]

        assets = [UnicodeFileAsset(f) for f in asset_files]

        if asset_type == "css":
            compressor.register_bundle(make_css(bundle_name, global_css + assets))
        else:
            compressor.register_bundle(make_js(bundle_name, global_js + assets))

"""
Assets definitions look like this:

(asset_type, bundle_name, asset_files)

Where:
    asset_type is one of "css" or "js"
    bundle_name is the asset bundle name that will be used in templates
    asset_files is a list of file names to add to the bundle, or a single filename str if there's only one
"""

register_all([
    ("css", "index_css", "css/index.css"),
    ("js", "index_js", ["js/vendor/moment.js", "js/vendor/moment-timezone-with-data-2010-2020.js",
                        "js/vendor/humanize-duration.js", "js/vendor/angular-timer.js", "js/angular/index.js"]),

    ("css", "stream_css", ["css/vendor/video-js.css", "css/stream.css"]),
    ("js", "stream_js", ["js/vendor/angular-animate.js", "js/vendor/video.js", "js/angular/stream.js"]),

    ("css", "about_css", []),
    ("js", "about_js", "js/angular/about.js"),

    ("css", "rules_css", []),
    ("js", "rules_js", "js/angular/rules.js"),

    ("css", "contact_css", []),
    ("js", "contact_js", []),

    ("css", "admin_index_css", "css/admin/index.css"),
    ("js", "admin_index_js", "js/angular/admin/index.js"),

    ("css", "admin_login_css", "css/admin/login.css"),
    ("js", "admin_login_js", [])
])
