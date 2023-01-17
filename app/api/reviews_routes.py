from flask import Blueprint, redirect, request
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

    db.session.delete(review)
    db.session.commit()

    return {"message": "deleted successfully"}


@review_route.route('/<int:id>', methods=['PUT'])
def updateReview(id):

    form = ReviewForm()
    review = Review.query.get(id)

    review.body = form.data['body']
    review.rating = form.data['rating']
    review.image = form.data['image']

        # form.populate_obj(review)
    db.session.commit()

    return review.to_dict_basic()
