from flask.ext.sqlalchemy import SQLAlchemy
from werkzeug.contrib.cache import SimpleCache

db = SQLAlchemy()
cache = SimpleCache()
