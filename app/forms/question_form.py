from app.models import Question
from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired()])
