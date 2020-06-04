import subprocess

site_revision = subprocess.getoutput("git rev-parse --short HEAD")
