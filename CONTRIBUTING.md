Contributing
============

#### Guidelines for contributing, to be followed by both pull requests and those with direct commit access


##### Code style

* Indent using 4 spaces, **no tabs allowed**. This goes for all file types.
* Follow PEP8 wherever possible for Python code style. Line lengths are flexible, however.
* Open with one level of indentation inside of Jinja2 template blocks before starting the actual HTML code.
* Anything not explicitly outlined, try to find an example of it in the existing code and follow it.

#### General best practices
* Don't link to external CSS/JS/other assets. Instead, add them to the static folder and configure the minifier to add them to whatever page you please.

##### Git strategies

* The `master` branch is the currently deployed code. Do not commit directly to it under any circumstances.
* The `dev` branch is for small changes/fixes that take only one small commit.
* Feature branches are to be used for larger fixes with multiple and/or large commits.
* The merging strategy in place is `[feature branch ->] dev -> master`
* All changes must be tested thoroughly before being merged into master.
* Code on master is automatically deployed to the server, but any backend (Python) code changes require a manual daemon restart.
