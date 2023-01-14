from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id =  db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    image = db.Column(db.String(280), nullable=True)
    rating = db.Column(db.Integer, nullable=False)
    body = db.Column(db.String(280), nullable=False)

    review_biz = db.relationship('Business', back_populates="biz_review", cascade='all,delete')
    review_owner = db.relationship("User", back_populates="reviews")

    def __repr__(self):
        return f"<Review id: {self.id}, Biz Id: {self.business_id}, Rating: {self.rating}, body: {self.body}, image: {self.image}>"


    def to_dict(self):
        return {
        "id": self.id,
        "businessId": self.business_id,
        "userId": self.user_id,
        "image": self.image,
        "rating": self.rating,
        "body": self.body,
        "firstName": self.review_owner.to_dict()['firstName'],
        "username": self.review_owner.to_dict()['firstName'],
        "firstName": self.review_owner.to_dict()['firstName'],
        "lastName": self.review_owner.to_dict()['lastName']
    }

    def to_dict_basic(self):
        return {
        "id": self.id,
        "businessId": self.business_id,
        "userId": self.user_id,
        "image": self.image,
        "rating": self.rating,
        "body": self.body
        }
