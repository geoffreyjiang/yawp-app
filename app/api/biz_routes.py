from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Business, db, Review, Menu
from app.forms import BizForm
from app.forms import ReviewForm
from app.models import Business, db, Review, Menu, Question
from app.forms import BizForm, QuestionForm, MenuForm

biz_routes = Blueprint('biz', __name__)

#  Business CRUD
# All businesses
@biz_routes.route('')
def get_all_bizes():

    business = Business.query.all()

    return {biz.id: biz.to_dict() for biz in business}

# Create a business
@biz_routes.route("", methods=["POST"])
def create_new_biz():

    biz_data = request.json

    new_biz = Business(**biz_data, user_id=current_user.id)

    db.session.add(new_biz)
    db.session.commit()

    return new_biz.to_dict()

# Get a business by ID
@biz_routes.route('/<int:id>')
def get_biz_by_id(id):

    business = Business.query.get(id)

    return business.to_dict()


# Edit a Business
@biz_routes.route("/<int:id>", methods=["PUT"])
def edit_biz(id):

    business = Business.query.get(id)

    form = BizForm()

    business.name = form.data['name']
    business.address1 = form.data['address1']
    business.address2 = form.data['address2']
    business.city = form.data['city']
    business.state = form.data['state']
    business.image = form.data['image']

    db.session.commit()

    return business.to_dict_basic()


# Delete a business
@biz_routes.route('/<int:id>', methods=["DELETE"])
def delete_biz(id):
    data = request.json
    biz_delete = Business.query.get(id)


    db.session.delete(biz_delete)
    db.session.commit()
    return {"message": "deleted successfully"}


# Menu CRUD

# Get the menu by its ID
@biz_routes.route("/<int:id>/menu")
def menu_by_id(id):

    menus = Menu.query.filter(Menu.business_id == id).all()

    return {menu.id: menu.to_dict() for menu in menus}


# Create a new menu item
@biz_routes.route("/<int:id>/menu", methods=["POST"])
@login_required
def create_new_menu_item(id):
    form = MenuForm()
    new_menu = Menu(
        name = form.data['name'],
        price = form.data['price'],
        business_id = id
    )
    db.session.add(new_menu)
    db.session.commit()
    return new_menu.to_dict()

#Get Reviews Route
@biz_routes.route('/<int:id>/reviews')
def bizReviews(id):
    reviews = Review.query.filter(Review.business_id == id).all()

    return {review.id: review.to_dict() for review in reviews}

@biz_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def postReview(id):
    current_user_id = int(current_user.get_id())
    form = ReviewForm()
    review = Review(
        body = form.data['body'],
        rating = form.data['rating'],
        image = form.data['image'],
        user_id = current_user_id,
        business_id = id
        )
        # form.populate_obj(review)
    print(request.method, "METHOD REQUEST")
    db.session.add(review)
    db.session.commit()
    return review.to_dict()
@biz_routes.route("/<int:id>/questions")
def questions_by_id(id):

    questions = Question.query.filter(Question.business_id == id).all()

    return {question.id: question.to_dict() for question in questions}

@biz_routes.route('/<int:id>/questions', methods=['POST'])
@login_required
def post_question(id):
    current_user_id = int(current_user.get_id())
    form = QuestionForm()

    new_question = Question(
        user_id = current_user_id,
        business_id = id,
        body = form.data['body']
    )


    db.session.add(new_question)
    db.session.commit()


    return new_question.to_dict()
