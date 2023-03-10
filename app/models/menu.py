from .db import db, environment, SCHEMA, add_prefix_for_prod

class Menu(db.Model):
    __tablename__ = 'menus'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Integer,  nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('businesses.id')), nullable=False)

    biz_food = db.relationship('Business', back_populates="food_menu", cascade='all,delete')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "businessId": self.business_id,
        }
