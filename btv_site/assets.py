from flask.ext.assets import Environment, Bundle

assets = Environment()

global_css = ["css/vendor/bootstrap.css", "css/global.css"]
global_js = ["js/vendor/angular.js", "js/angular/common.js",
             "js/header.js"]


def make_css(name, assets):
    return Bundle(*assets, filters="cssmin", output="min/css/%s.css" % name)


def make_js(name, assets):
    return Bundle(*assets, filters="jsmin", output="min/js/%s.js" % name)


def register_all(lst):
    for asset_type, bundle_name, asset_files in lst:
        if isinstance(asset_files, str):
            asset_files = [asset_files]

        if asset_type == "css":
            assets.register(bundle_name, make_css(bundle_name, global_css + asset_files))
        else:
            assets.register(bundle_name, make_js(bundle_name, global_js + asset_files))

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

    ("css", "chat_css", ["css/chat.css"]),
    ("js", "chat_js", []),

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
