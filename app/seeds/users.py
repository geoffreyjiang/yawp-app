from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    andre = User(
        username='asilva',
        password='password',
        first_name='Andre',
        last_name='Silva',
        email='asilva@aa.io',
        phone_number='01111111111',
        business_owner=True
        )
    # print(dir(andre))
    geoffrey = User(
        username='gjiang',
        password='password',
        first_name='Geoffrey',
        last_name='Jiang',
        email='gjiang@aa.io',
        phone_number='02222222222',
        business_owner=True
        )
    michael = User(
        username='mlove',
        password='password',
        first_name='Michael',
        last_name='Love',
        email='mlove@aa.io',
        phone_number='03333333333',
        business_owner=True)

    db.session.add(andre)
    db.session.add(geoffrey)
    db.session.add(michael)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
