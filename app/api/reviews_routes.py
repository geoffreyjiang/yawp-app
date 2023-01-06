from flask import Blueprint
from app.models import Review, db

# bp = Blueprint('reviews', __name__, url_prefix='/reviews')
business_route = Blueprint('biz', __name__, url_prefix='/biz')

# @bp.route('/reviews')
# def reviews():
#     review = Review.query.all()
#     return {review.to_dict() for review in review}


@business_route.route('/<int:id>/reviews')
def bizReviews(id):
    review = Review.query.filter(Review.business_id == id).all()
    return {review.id: review.to_dict() for i in review}


# @business_route.route('/<int:id>', method=['POST'])
# def postReview(id):

