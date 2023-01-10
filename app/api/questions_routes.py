# from flask import Blueprint,redirect
# from flask_login import login_required, current_user
# from app.models import Question, Business, db
# from app.forms import QuestionForm
# bp = Blueprint('questions', __name__, url_prefix='/questions')
# business_route = Blueprint('biz', __name__, url_prefix='/biz')
# question_route = Blueprint('question', __name__,url_prefix='/questions')
# @bp.route('/questions')
# def question():
#     q = Question.query.all()
#     return {q.to_dict() for i in q}


# @business_route.route('/<int:id>', method=["GET"])
# def bizQuestions(id):
#     question = Question.query.filter(Question.business_id == id).all()
#     return {question.id: question.to_dict() for q in question}


# @business_route('/<int:id>/questions', method=['POST'])
# @login_required
# def postQuestion(id):
#     current_user_id = int(current_user.get_id())
#     form = QuestionForm()

#     # question = Question()
#     new_question = Question(
#         user_id = current_user_id,
#         business_id = id,
#         body = form.data['body']
#     )
#     # form.populate_obj(question)

#     print(new_question)
#     print('WE ARE HERE !!!!!!!!!!!!!!!')
#     # db.session.add(question)
#     db.session.add(new_question)
#     db.session.commit()
#     # return redirect(f'/biz/{id}')
#     print(new_question)
#     print('@@@@@@@@  WE ARE HERE !!!!!!!!!!!!!!!')
#     return new_question.to_dict()
