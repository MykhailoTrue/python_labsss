"""Add initial roles

Revision ID: 5a225f1bb4f6
Revises: 7f84ee2fe01a
Create Date: 2024-10-31 11:01:56.214049

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5a225f1bb4f6'
down_revision: Union[str, None] = '7f84ee2fe01a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
