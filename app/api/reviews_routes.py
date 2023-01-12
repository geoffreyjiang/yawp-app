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
    if review:
        db.session.delete(review)
        db.session.commit()
        return redirect(f'/biz/{id}')


@review_route.route('/<int:id>', methods=['PATCH'])
def updateReview(id):

    form = ReviewForm()
    review = Review.query.get(id)
    print(form.data, "<=== FORM DATA")
    print(form.data['body'], "<=== FORM DATA BODY")
    review.body = form.data['body'],
    review.rating = form.data['rating'],
    review.image = form.data['image']

    print(review, "<=== REVIEW API BACKEND DATA")
        # form.populate_obj(review)
    db.session.commit()
    return review.to_dict_basic()
