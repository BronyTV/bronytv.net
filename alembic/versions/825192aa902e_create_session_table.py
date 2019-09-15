"""Create Session table

Revision ID: 825192aa902e
Revises: 67dae00c4ee8
Create Date: 2019-09-15 07:16:53.013436

"""

# revision identifiers, used by Alembic.
revision = '825192aa902e'
down_revision = '67dae00c4ee8'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('sessions',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('session_id', sa.String(255), unique=True),
        sa.Column('data', sa.LargeBinary),
        sa.Column('expiry', sa.DateTime)
    )


def downgrade():
    op.drop_table('sessions')
