"""Create playlist table

Revision ID: 21b2c9575a84
Revises: 9d93e14a695
Create Date: 2015-10-17 03:07:43.430684

"""

# revision identifiers, used by Alembic.
revision = '21b2c9575a84'
down_revision = '9d93e14a695'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'playlist',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(128)),
        sa.Column('artist', sa.String(128)),
        sa.Column('link', sa.String(128))
    )


def downgrade():
    op.drop_table('playlist')
