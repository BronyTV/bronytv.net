"""Create stream viewers table

Revision ID: 67dae00c4ee8
Revises: 21b2c9575a84
Create Date: 2016-07-29 20:29:26.782690

"""

# revision identifiers, used by Alembic.
revision = '67dae00c4ee8'
down_revision = '21b2c9575a84'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'stream_viewers',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('unique', sa.String(32)),
        sa.Column('timestamp', sa.TIMESTAMP)
    )


def downgrade():
    op.drop_table('stream_viewers')
