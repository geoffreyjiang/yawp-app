from app.models import db, Answer, environment, SCHEMA

def seed_answers():
    answer1 = Answer(
        user_id=1,
        question_id=1,
        body="It was pretty mid ngl"
    )

    answer2 = Answer(
        user_id=1,
        question_id=2,
        body="YOOOO this was BUSSIN'"
    )

    answer3 = Answer(
        user_id=2,
        question_id=1,
        body="My personal favorite place to go to."
    )

    answer4 = Answer(
        user_id=3,
        question_id=3,
        body="Yum!"
    )

    db.session.add(answer1)
    db.session.add(answer2)
    db.session.add(answer3)
    db.session.add(answer4)
    db.session.commit()

def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM answers")

    db.session.commit()
