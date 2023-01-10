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

@review_route.route('/<int:id>', method=['POST'])
@login_required
def postReview(id):
        form = ReviewForm()
        review = Review()
        form.populate_obj(review)

        db.session.add(review)
        db.session.commit()
        return redirect(f'/biz/{id}')



@review_route.route('/<int:id>', method=['DELETE'])
def deleteReview(id):
    review = Review.query.get(id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return redirect(f'/biz/{id}')


@review_route.route('/<int:id>', method=['PUT'])
def updateReview(id):
    form = ReviewForm()
    if form.validate_on_submit():
        review = Review.query.filter_by(id=f'{id}')
        review.body = form.data['body']
        db.session.commit()
        return redirect(f'/biz/{id}')
