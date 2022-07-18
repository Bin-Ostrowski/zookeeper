const router = require("express").Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal, } = require("../../lib/animals");
const { animals } = require("../../data/animals");

//get animal using query params to return groups of animals
router.get("/animals", (req, res) => {
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });
  
//get by id to return a single animal
router.get("/animals/:id", (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });

//path to strore new animal
router.post("/animals", (req, res) => {
    // set id based on what the next index of the array will be 
    //Remember, the length property is always going to be one number 
    //ahead of the last index of the array so we can avoid any duplicate values.
    req.body.id = animals.length.toString();

    //if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        //response method to relay a message to the client making the request. 
        //We send them an HTTP status code and a message explaining what went wrong
        res.status(400).send("The animal is not properly formatted.");
    } else {
        //add animal to json file and animals array in this fucntion
        const animal = createNewAnimal(req.body, animals);
        //req.body is where our incoming content will be
        res.json(animal);
    };
});

module.exports = router;
