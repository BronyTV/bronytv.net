import json

from database import db
from models import User
from functools import wraps
from flask import request, Response, make_response


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


def add_response_headers(headers=None):
    """This decorator adds the headers passed in to the response"""
    if not headers:
        headers = {}

    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            resp = make_response(f(*args, **kwargs))
            h = resp.headers
            for header, value in headers.items():
                h[header] = value
            return resp
        return decorated_function
    return decorator
