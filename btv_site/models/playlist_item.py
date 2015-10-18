from btv_site.database import db


class PlaylistItem(db.Model):
    __tablename__ = "playlist"
    id = db.Column(db.Integer, primary_key=True)  # Item ID
    name = db.Column(db.String(128))              # Item title
    artist = db.Column(db.String(128))            # Item artist
    link = db.Column(db.String(128))              # Item URL

    def __init__(self, name, artist=None, link=None):
        self.name = name
        self.artist = artist
        self.link = link

    def json(self):
        return dict(id=self.id, name=self.name, artist=self.artist, link=self.link)
