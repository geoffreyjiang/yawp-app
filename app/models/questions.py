from .db import db, environment, SCHEMA, add_prefix_for_prod

class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    business_id =  db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)
    body = db.Column(db.String(280), nullable=False)

    question_owner = db.relationship("User", back_populates="questions")
    question_biz = db.relationship("Business", back_populates="biz_question")
    question_answer = db.relationship("Answer", back_populates="answer_question")

def to_dict(self):
    return {
        "id": self.id,
        "user_id": self.user_id,
        "business_id": self.business_id,
        "body": self.body
    }
