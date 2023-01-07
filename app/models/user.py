from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.String(25), nullable=True)
    profile_pic = db.Column(db.String(255), nullable=True)
    business_owner = db.Column(db.Boolean, nullable=False)

    biz = db.relationship('Business', back_populates='biz_owner', cascade='all, delete')
    reviews = db.relationship('Review', back_populates='review_owner')
    questions = db.relationship('Question', back_populates='question_owner')
    answers = db.relationship('Answer', back_populates='answer_owner')

    # @property
    # def password(self):
    #     return self.password

    # @password.setter
    # def password(self, password):
    #     self.password = generate_password_hash(password)

    # def check_password(self, password):
    #     return check_password_hash(self.password, password)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'business_owner': self.business_owner
        }
