from btv_site.database import db


class SiteProperty(db.Model):
    __tablename__ = "site_properties"
    id = db.Column(db.Integer, primary_key=True)  # Property ID
    name = db.Column(db.String(32))               # Property key
    value = db.Column(db.Text())                  # Property value

    def __init__(self, name, value):
        self.name = name
        self.value = value
