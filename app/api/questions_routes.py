from flask import Blueprint,redirect
from flask_login import login_required
from app.models import Question, Business, db
from app.forms import QuestionForm
# bp = Blueprint('questions', __name__, url_prefix='/questions')
business_route = Blueprint('biz', __name__, url_prefix='/biz')
question_route = Blueprint('question', __name__,url_prefix='/questions')
# @bp.route('/questions')
# def question():
#     q = Question.query.all()
#     return {q.to_dict() for i in q}


@business_route.route('/<int:id>', method=["GET", "POST"])
def bizQuestions(id):
    question = Question.query.filter(Question.business_id == id).all()
    return {question.id: question.to_dict() for q in question}


@question_route.route('/<int:id>', method=['GET','POST'])
@login_required
def postQuestion(id):
    form = QuestionForm()
    question = Question()
    form.populate_obj(question)

    db.session.add(question)
    db.session.commit()
    return redirect(f'/biz/{id}')
