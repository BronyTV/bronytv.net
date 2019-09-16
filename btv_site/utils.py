import commands

site_revision = commands.getoutput("git rev-parse --short HEAD")
