from .db import db, environment, SCHEMA, add_prefix_for_prod

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    address1 = db.Column(db.String, nullable=False)
    address2 = db.Column(db.String, nullable=True)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    biz_owner = db.relationship("User", back_populates="biz")
    biz_question = db.relationship('Question', back_populates='question_biz', cascade='all, delete')
    biz_review = db.relationship('Review', back_populates='review_biz', cascade='all, delete')
    food_menu = db.relationship('Menu', back_populates="biz_food", cascade='all, delete')


    def __repr__(self):
        return f"<Biz id: {self.id}, name: {self.name}, address: {self.address1}, city: {self.city}, state: {self.state}, user_id: {self.user_id}>"


    def to_dict(self):
        ratings = [reviews.to_dict()['rating'] for reviews in self.biz_review]
        total = sum(ratings)

        try:
            avg = total / len(ratings)
        except ZeroDivisionError:
            avg = 0
        return {
            "id": self.id,
            "name": self.name,
            "address1": self.address1,
            "address2": self.address2,
            "city": self.city,
            "state": self.state,
            "image": self.image,
            "userId": self.user_id,
            # "ownerFirstName": self.biz_owner.to_dict_basic()['first_name'],
            "averageRating": avg,
            "numberOfReviews": len([reviews.to_dict() for reviews in self.biz_review]),
            "reviews": [reviews.to_dict() for reviews in self.biz_review],
            # "username": self.biz_owner.to_dict_basic()['username']

        }

    def to_dict_basic(self):
        return {
            "id": self.id,
            "name": self.name,
            "address1": self.address1,
            "address2": self.address2,
            "city": self.city,
            "state": self.state,
            "image": self.image,

        }
