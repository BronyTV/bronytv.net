"""Create properties table

Revision ID: 9d93e14a695
Revises: 28b903e941a1
Create Date: 2015-10-16 23:42:36.977265

"""

# revision identifiers, used by Alembic.
revision = '9d93e14a695'
down_revision = '28b903e941a1'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'site_properties',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(32)),
        sa.Column('value', sa.Text())
    )


def downgrade():
    op.drop_table('site_properties')
