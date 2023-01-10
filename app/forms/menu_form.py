from app.models import Menu
from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired

class MenuForm(FlaskForm):
    name = TextAreaField('name', validators=[DataRequired()])
    price = TextAreaField('name', validators=[DataRequired()])
