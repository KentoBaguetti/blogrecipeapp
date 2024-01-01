import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// API stuff
const API_URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "5c2c11eafe7c4aba84e20c4a75743707";

// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// express stuff
app.get("/", async (req,res) => {
    res.render("index.ejs")
})

let hasSearched = false

app.post("/search", async (req,res) => {
    try {
        let searchedRecipe = req.body.recipeSearch
        const response = await axios.get(API_URL, {
            params: {
                apiKey: API_KEY,
                query: searchedRecipe,
                number: 30,
                addRecipeInformation: true
            }
        })
        let recipes = response.data.results
        console.log(recipes)

        res.render("index.ejs", {content: recipes})
        hasSearched = true
    } catch(error) {
        res.render("index.ejs")
        console.log("Error")
    }
})


app.listen(port, () => {
    console.log(`Running on port ${port}`)
})