from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Business, db

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
# @biz_routes.route("/<int:id>", methods=["PUT"])
# def edit_biz(id):

#     business = Business.query.get(id)
  
#     form = BizForm()

#     business.name = form.data['name']
#     business.address1 = form.data['address1']
#     business.address2 = form.data['address2']
#     business.city = form.data['city']
#     business.state = form.data['state']
#     business.image = form.data['image']
  
#     db.session.commit()

#     return business.to_dict_basic()


# Delete a business 
@biz_routes.route('/<int:id>', methods=["DELETE"])
def delete_biz(id):
    data = request.json
    biz_delete = Business.query.get(id)

   
    db.session.delete(biz_delete)
    db.session.commit()
    return {"message": "deleted successfully"}