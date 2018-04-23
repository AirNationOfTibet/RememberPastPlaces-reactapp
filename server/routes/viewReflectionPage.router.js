const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//this is my put route to change bookmark from being saved to unsaved or vice versa.
router.put('/:id', (req, res) =>{
})

//this is my delete router to remove reflections from the database.
router.delete('/:id', (req, res) =>{
  const reflectionID = req.params.id;
  const queryText = `DELETE FROM "reflection" WHERE id = $1;`;
  pool.query(queryText, [reflectionID])
  .then((response) => {
    console.log('delete success');
    res.sendStatus(200);
  }).catch((error) =>{
    console.log('there is an error with the delete router ', error);
    res.sendStatus(500);
  })
})

//this is our get router to get reflections from our database.
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "reflection" ORDER BY "id" DESC;`;
    console.log('router.get queryText: ', queryText)
    pool.query(queryText)
      .then((response) => { 
        res.send(response.rows); 
      })
      .catch((error) => {
        console.log('Error completing SELECT order query', error);
        res.sendStatus(500);
      });
  });

//this is our post router to send the reflections we wrote to our database.
router.post('/', (req, res) => {
  console.log('post router is working');
  let queryText =  `INSERT INTO "reflection" ("topic", "description") VALUES ($1, $2);`;
  pool.query(queryText, [req.body.topic, req.body.reflection])
    .then((response)=>{
      res.sendStatus(200);
    })
    .catch((error)=>{
      res.sendStatus(500);
    })
})

  


module.exports = router;