from .db import db, environment, SCHEMA

class Question(db.Question):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    business_id =  db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
    body = db.Column(db.String(280), nullable=False)

    question_owner = db.relationship("User", back_populates="questions")
    biz_question = db.relationship("Business", back_populates="question_biz")
    question_answer = db.relationship("Answer", back_populates="answer_question")

def to_dict(self):
    return {
        "id": self.id,
        "user_id": self.user_id,
        "business_id": self.business_id,
        "body": self.body
    }
