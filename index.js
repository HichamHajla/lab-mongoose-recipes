const mongoose = require('mongoose');
require('dotenv').config()

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = process.env.MONGODB_URI

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
    title: "Omelettes aux champignons",
    level: "Easy Peasy",
    ingredients: ["Eggs", "Cheese", "Mushrooms", "Oil"],
    cuisine: "French",
    dishType: "main_course",
    image: "https://img.cuisineaz.com/660x660/2013/12/20/i72293-omelette-aux-champignons.webp",
    duration: 10,
    creator: "Hicham Hajla",
  })
    .then((recipe) => console.log(recipe.title))
    .then(()=> Recipe.insertMany(data))
    .then((data)=> {data.map(e => {console.log(e.title)})})
    .then(()=> Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}))
    .then(()=> console.log('Rigatoni alla Genovese has been updated!'))
    .then(()=> Recipe.deleteOne({title: 'Carrot Cake'}))   
    .then(()=> console.log('Carrot Cake deleted successfully!'))
    .then(()=> mongoose.connection.close())
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
