from btv_site.database import db


class StreamViewer(db.Model):
    __tablename__ = "stream_viewers"
    id = db.Column(db.Integer, primary_key=True)  # Property ID
    unique = db.Column(db.String(32))             # Client Unique ID
    timestamp = db.Column(db.TIMESTAMP)           # Timestamp of last request

    def __init__(self, unique, timestamp):
        self.unique = unique
        self.timestamp = timestamp

    def __repr__(self):
        return '<StreamViewer {0} {1} {2}>'.format(self.id, self.unique, self.timestamp)
