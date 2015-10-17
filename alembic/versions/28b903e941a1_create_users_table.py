"""Create users table

Revision ID: 28b903e941a1
Revises: 
Create Date: 2015-10-16 23:39:08.288549

"""

# revision identifiers, used by Alembic.
revision = '28b903e941a1'
down_revision = None
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('username', sa.String(16)),
        sa.Column('password_digest', sa.String(60)),
        sa.Column('api_key', sa.String(32))
    )


def downgrade():
    op.drop_table('users')
