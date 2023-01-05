from app.models import db, Menu, environment, SCHEMA



def seed_menus():
    item1 = Menu(
        name="Hamburger",
        price= 5.95,
        business_id=1
        )
     
    item2 = Menu(
        name="French Fries",
        price= 2.34,
        business_id=1
        )

    item3 = Menu(
        name="Ribs",
        price= 21.99,
        business_id=2
        )
    item4 = Menu(
        name="Potatos",
        price= 4.55,
        business_id=2
        )
    item5 = Menu(
        name="Lobster",
        price= 134.55,
        business_id=3
        )
    item6 = Menu(
        name="Milk Shake",
        price= 2.45,
        business_id=3
        )
    

    
  
    
    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.add(item4)
    db.session.add(item5)
    db.session.add(item6)
    
    db.session.commit()

def undo_menus():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menus RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM menus")
        
        
    db.session.commit()