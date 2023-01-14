from app.models import db, Business, environment, SCHEMA



def seed_businesses():
    biz1 = Business(
        name="McDonalds",
        address1="3501 Grand Ave",
        address2='',
        city="LA",
        state="California",
        image="https://upload.wikimedia.org/wikinews/en/9/97/Mcdonalds-logo.JPG",
        user_id=1

        )
    biz2 = Business(
        name="Burger King",
        address1="625 Hammy Driver",
        address2='',
        city="The Bay",
        state="New York",
        image="https://logos-download.com/wp-content/uploads/2016/04/Burger_King_logo_emblem-2.png",
        user_id=2
        )

    biz3 = Business(
        name="Rally's",
        address1="123 University Road",
        address2="",
        city="Seattle",
        state="Washington",
        image="https://as1.ftcdn.net/v2/jpg/04/57/56/50/1000_F_457565028_SNYUm8wEhR5vHgUyXDeZYAMYNS9PN4Ch.jpg",
        user_id=3
        )

    db.session.add(biz1)
    db.session.add(biz2)
    db.session.add(biz3)
    db.session.commit()

def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM businesses")




    db.session.commit()
