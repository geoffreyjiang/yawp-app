from flask import Blueprint, redirect
from app.models import Review, db
from flask_login import login_required, current_user
from app.forms import ReviewForm
# bp = Blueprint('reviews', __name__, url_prefix='/reviews')
review_route = Blueprint('reviews', __name__, url_prefix='/reviews')

# @bp.route('/reviews')
# def reviews():
#     review = Review.query.all()
#     return {review.to_dict() for review in review}




@review_route.route('/<int:id>', methods=['DELETE'])
def deleteReview(id):
    review = Review.query.get(id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return redirect(f'/biz/{id}')


@review_route.route('/<int:id>', methods=['PUT'])
def updateReview(id):
    review_edit = Review.query.get(id)

    form = ReviewForm()
    review_edit.body = form.data['body']
    review_edit.rating = form.data['rating']
    review_edit.image = form.data['image']

    db.session.commit()

    return review_edit.to_dict()
