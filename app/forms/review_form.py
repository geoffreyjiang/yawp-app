from app.models import Review
from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, StringField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    image = StringField('image')
