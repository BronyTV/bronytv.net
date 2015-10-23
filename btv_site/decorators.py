import json

from database import db
from models import User
from functools import wraps
from flask import request, Response


def api_key_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.method == "POST":
            api_key = request.args.get("api_key", "")
            user = db.session.query(User).filter(User.api_key == api_key).first()
            if not user:
                return Response(json.dumps({"error": True, "message": "Invalid API key supplied"}), 403, None,
                            "application/json", "application/json")
        return f(*args, **kwargs)
    return decorated_function
