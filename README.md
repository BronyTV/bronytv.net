bronytv.net
===========

#### Information

This is the Flask app that powers [BronyTV](http://bronytv.net).

It runs on Python 3, and depends on the following `pip` packages:

* flask
* requests
* flask-sqlalchemy
* flask-session
* psycopg2-binary
* bcrypt
* flask-assets
* flask-socketio
* eventlet
* cssmin
* jsmin

The frontend of the app is powered by AngularJS, the source files of which are included in this repository.

In production, the application is served by gunicorn, behind nginx.

Deployment is managed with Ansible, using our [playbooks](https://github.com/BronyTV/ansible-playbooks).

For development, a `run_debug.py` script is included, which may be directly executed to start a test server assuming you have all dependencies.

#### Contributing code

See [CONTRIBUTING.md](https://github.com/BronyTV/bronytv.net/blob/master/CONTRIBUTING.md) for information. **Read this before committing!**
