from btv_site.database import db


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)  # User ID
    username = db.Column(db.String(16))           # User's username
    password_digest = db.Column(db.String(60))    # BCrypt password digest
