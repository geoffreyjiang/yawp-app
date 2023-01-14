from .db import db, environment, SCHEMA, add_prefix_for_prod

class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")), nullable=False)
    body = db.Column(db.String(255), nullable=False)

    answer_owner = db.relationship('User',  back_populates='answers')
    answer_question = db.relationship('Question', back_populates='question_answer', cascade='all,delete')
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "question_id": self.question_id,
            "body": self.body
        }
