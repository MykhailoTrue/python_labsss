"""Add initial roles

Revision ID: 3aa923bfa5ce
Revises: cb70886ac7d7
Create Date: 2024-10-31 10:37:11.193748

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column


# revision identifiers, used by Alembic.
revision: str = '3aa923bfa5ce'
down_revision: Union[str, None] = 'cb70886ac7d7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


roles_table = table(
    'roles',
    column('id'),
    column('name')
)

def upgrade():
    op.bulk_insert(
        roles_table,
        [
            {"id": 1, "name": "user"},
            {"id": 2, "name": "admin"}
        ]
    )

def downgrade():
    op.execute("DELETE FROM roles WHERE id IN (1, 2)")