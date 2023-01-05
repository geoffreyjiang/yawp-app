from .db import db, environment, SCHEMA

class Business(db.Model):
    __tablename__ = 'businesses'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    address1 = db.Column(db.String, nullable=False)
    address2 = db.Column(db.Integer, nullable=True)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    biz_owner = db.relationship("User", back_populates="biz")
    biz_question = db.relationship('Question', back_populates='question_biz', cascade='all, delete')
    biz_review = db.relationship('Review', back_populates='review_biz', cascade='all, delete')
    food_menu = db.relationship('Men', back_populates="biz_food")


    def __repr__(self):
        return f"<Biz id: {self.id}, name: {self.name}, address: {self.address1}, city: {self.city}, state: {self.state}, user_id: {self.user_id}>"
        
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "address1": self.address1,
            "address2": self.address2,
            "city": self.city,
            "state": self.state,
            "image": self.image,
            "userId": self.user_id,
            "username": self.biz_owner.to_dict_basic()['username']
            
        }

    def to_dict_basic(self):
        return {
            "id": self.id,
            "body": self.body,
            "stars": self.stars,
            "image": self.image,
            "userId": self.user_id,
            "businessId": self.business_id
           

        }