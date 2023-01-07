from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Answer

class AnswerForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired()])
