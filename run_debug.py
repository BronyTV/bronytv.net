#!/usr/bin/env python
from btv_site.app import app, sio

if __name__ == "__main__":
    sio.run(app, host="0.0.0.0", port=8000, debug=True)
