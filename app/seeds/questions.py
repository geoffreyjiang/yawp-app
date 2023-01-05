from app.models import db, Question, environment, SCHEMA

def seed_questions():
    one = Question(
        business_id='1',
        user_id='2',
        body='Whats the best dish?'
    )
    two = Question(
        business_id='2',
        user_id='1',
        body='Do they have happy hour?'
    )
    three = Question(
        business_id='2',
        user_id='2',
        body='What time do they open?'
    )
    four = Question(
        business_id='1',
        user_id='1',
        body='Is there parking?'
    )

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)
    db.session.commit()


def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM questions")


    db.session.commit()
