"""empty message

Revision ID: 40efbac0608e
Revises: ffdc0a98111c
Create Date: 2023-01-05 20:53:53.508280

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '40efbac0608e'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('businesses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=300), nullable=False),
    sa.Column('address1', sa.String(), nullable=False),
    sa.Column('address2', sa.Integer(), nullable=True),
    sa.Column('city', sa.String(), nullable=False),
    sa.Column('state', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('menus',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('business_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['business_id'], ['businesses.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('questions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('business_id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(length=280), nullable=False),
    sa.ForeignKeyConstraint(['business_id'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('business_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('image', sa.String(length=280), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(length=280), nullable=False),
    sa.ForeignKeyConstraint(['business_id'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('answers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('first_name', sa.String(length=255), nullable=False))
    op.add_column('users', sa.Column('last_name', sa.String(length=255), nullable=False))
    op.add_column('users', sa.Column('phone_number', sa.String(length=25), nullable=True))
    op.add_column('users', sa.Column('profile_pic', sa.String(length=255), nullable=True))
    op.add_column('users', sa.Column('business_owner', sa.Boolean(), nullable=False))
    op.drop_column('users', 'hashed_password')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('hashed_password', sa.VARCHAR(length=255), nullable=False))
    op.drop_column('users', 'business_owner')
    op.drop_column('users', 'profile_pic')
    op.drop_column('users', 'phone_number')
    op.drop_column('users', 'last_name')
    op.drop_column('users', 'first_name')
    op.drop_table('answers')
    op.drop_table('reviews')
    op.drop_table('questions')
    op.drop_table('menus')
    op.drop_table('businesses')
    # ### end Alembic commands ###