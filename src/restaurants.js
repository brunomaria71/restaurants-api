import connectDb from "./connectDb.js";

export const addRestaurant = async (request, response) => {
  // check if request is valid
  if (!req.body || !req.body.name || !req.body.address) {
    response.status(401).send("Invalid request");
    return;
  }
  // connect to the firestore
  const db = connectDb();
  //prepare the data
  const newRestaurant = {
    name: req.body.name,
    address: req.body.address,
    rating: req.body.rating || 3, // if i dont have a rating, assign it to this default one
    cuisine: req.body.cuisine || "american", // make these assumptions so the users can fill out forms correctly
  };
  // add data to the restaurant collection
  try {
    const doc = await db.collection("restaurants").add(newRestaurant);
    // respond with success
    response.status(201).send("Restaurant created " + doc.id);
  } catch (err) {
    // respond with error

    response.status(500).send(err);
  }
};

// this si sthe same as the async await function
// db.collection('restaurants'.add(newRestaurant))
// .then (doc => response.status(201).send('Restaurant created ' + doc.id);
// .catch(err => response.status(500).send(err);


export const getAllRestaurants = async (req,res) => {
    const db = connectDb();
    try {
        const snapshot = await db.collection('restaurants').get();
        const restaurantsArray = snapshot.docs.map(doc => {
            let restaurant = doc.data();
            restaurant.id = doc.id;
            return restaurant;
        })
        res.send(restaurantsArray); 
} catch (err) {
    res.status(500).send(err);
}
}