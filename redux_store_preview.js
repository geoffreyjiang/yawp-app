const store = {
    biz: {
        1: {
            address1: "625 Hammy Driver",
            address2: "345",
            city: "The Bay",
            id: 2,
            image: "https://logos-download.com/wp-content/uploads/2016/04/Burger_King_logo_emblem-2.png",
            name: "Burger King",
            state: "New York",
            userId: 2,
            AvgRating: 4.7,
            // list of questions (number of questions)
            // list food of food items (ids)
            // list of food images
        },
    },
    questions: {
        2: {
            body: "Does this place have dine in?",
            businessId: 2,
            id: 2,
            userId: 1,
            answers: {
                3: { id: 3, body: "Yes!", userId: 3, username: "Demo" },
            },
        },
    },
    reviews: {
        1: {
            body: "this place is great",
            businessId: 1,
            id: 4,
            image: "pic.jpg",
            stars: 4,
            userId: 3,
        },
    },
    food: {
        1: {
            id: 1,
            businessId: 2,
            price: 3.6,
            name: "Tacos",
            image: "pic2.jpg",
        },
        2: {
            id: 2,
            businessId: 2,
            price: 3.6,
            name: "Hotdogs",
            image: "pic3.jpg",
        },
    },
};
