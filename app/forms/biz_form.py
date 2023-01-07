from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class BizForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    address1 = StringField("address1", validators=[DataRequired()])
    address2 = StringField("address2")
    city = StringField("city", validators=[DataRequired()])
    state = StringField("state", validators=[DataRequired()])
    image = StringField("image")
