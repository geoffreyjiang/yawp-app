from app.models import Review
from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    body = StringField('body', validators=[DataRequired()])
