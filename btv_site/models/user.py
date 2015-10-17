import random
import string

from btv_site.database import db


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)  # User ID
    username = db.Column(db.String(16))           # User's username
    password_digest = db.Column(db.String(60))    # BCrypt password digest
    api_key = db.Column(db.String(32))

    def get_api_key(self):
        if not self.api_key:
            self.api_key = "".join(random.choice(string.ascii_letters) for _ in range(0, 32))

        return self.api_key
