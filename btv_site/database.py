from flask_sqlalchemy import SQLAlchemy
from cachelib import SimpleCache

db = SQLAlchemy()
cache = SimpleCache()

