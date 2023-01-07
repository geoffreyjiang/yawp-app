from flask import Blueprint, jsonify, redirect
from app.models import db, Answer

answer_routes = Blueprint('answers', __name__)

@answer_routes.route('/answers', methods=['GET'])
def answers():
    answers = Answer.query.all()
    return {
        'answers': [answer.to_dict() for answer in answers]
    }

@answer_routes.route('/answers/<answer:id>', methods=['GET'])
def answer(id):
    answer = Answer.query.get(id)
    return answer.to_dict()

@answer_routes.route('/answers/<int:id>', methods=['POST'])
def add_answer(id):
    # needs form
    form
    if form.validate_on_submit():
        newAnswer = Answer()

        form.populate_obj(newAnswer)

        db.session.add(newAnswer)
        db.session.commit()

        return redirect('/')

@answer_routes.route('/answers/<int:id>', methods=['UPDATE'])
def update_answer(id):
    form
    if form.validate_on_submit():
        updatedAnswer = Answer.query.filter_by(id=f'{id}')
        updatedAnswer.body = form.data['body']
        # db.session.add(newAnswer)
        db.session.commit()
        return redirect('/')

@answer_routes.route('/answers/<int:id>', methods=['DELETE'])
def delete_answer(id):
    answer = Answer.query.get(id)
    db.session.delete(answer)
    db.session.commit()
