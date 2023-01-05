from app.models import db, Review, environment, SCHEMA

def seed_reviews():
    one = Review(
        business_id=1,
        user_id=2,
        image='something.jpg',
        rating=3.7,
        body='i love this place!'
    )
    two = Review(
        business_id=2,
        user_id=1,
        image='something.jpg',
        rating=1.7,
        body='i hate this place!'
    )
    three = Review(
        business_id=2,
        user_id=2,
        image='something.jpg',
        rating=4.6,
        body='this place is ok'
    )


    db.session.add(one)
    db.session.add(two)
    db.session.add(three)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")


    db.session.commit()
