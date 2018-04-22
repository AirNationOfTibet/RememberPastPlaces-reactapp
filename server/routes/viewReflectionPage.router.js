const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//this is our get router to get reflections from our database.
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "reflection"`;
    console.log('router.get queryText: ', queryText)
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT order query', err);
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