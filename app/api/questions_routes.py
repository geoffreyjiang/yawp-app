from flask import Blueprint
from flask_login import login_required
from app.models import Question, Business, db

# bp = Blueprint('questions', __name__, url_prefix='/questions')
business_route = Blueprint('biz', __name__, url_prefix='/biz')

# @bp.route('/questions')
# def question():
#     q = Question.query.all()
#     return {q.to_dict() for i in q}


@business_route.route('/<int:id>/questions')
def bizQuestions(id):

    question = Question.query.filter(Question.business_id == id).all()
    return {question.id: question.to_dict() for q in question}
