const express = require('express');
const app = express();
const port = 8000;
app.use(express.json());

const { Pool } = require('pg');

const pool = new Pool({
    user:'anthonyclay',
    host:'localhost',
    database:'newPetShop',
    password:'password',
    port:5432
})

app.post('/pets', async (req, res) => {
    try {
        pool.query('INSERT INTO pets (name, age, kind) VALUES ($1,$2,$3);', [req.body.name, req.body.age, req.body.kind])
        res.json(req.body)
    } catch (error) {
        res.json(error)
    }
})

app.get('/pets', async (req, res) => {
    try {
       const data = await pool.query('SELECT * FROM pets');
       res.json(data.rows);
    } catch (error) {
        res.json(error);
    }
})

app.get('/pets/:id', async (req, res) => {
    try {
       const data = await pool.query('SELECT * FROM pets WHERE id=$1;', [req.params.id]);
       if (data.rows.length === 0){
           res.status(404)
           res.send('Not Found')
       } else {
           res.json(data.rows);
       }
    } catch (error) {
        res.json(error);
    }
})

app.patch('/pets/:id', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM pets WHERE id=$1;', [req.params.id]);
       if (data.rows.length === 0){
           res.status(404)
           res.send('Not Found')
       } else {
           const name = req.body.name || data.rows[0].name;
           const age = req.body.age || data.rows[0].age;
           const kind = req.body.kind || data.rows[0].kind;
           pool.query('UPDATE pets SET (name, age, kind) = ($1,$2,$3) WHERE id=$4;', [name, age, kind, req.params.id])
           //const result = {name, age, kind}
           res.json({name, age, kind});
       }
    } catch (error) {
        res.json(error);
    }
})

app.delete('/pets/:id', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM pets WHERE id=$1;', [req.params.id]);
        if(data.rows.length === 0){
            res.status(404);
            res.send("not found");
        }else{
            pool.query('DELETE FROM pets WHERE id=$1', [req.params.id]);
            res.json(data.rows);
        }
    } catch (error) {
        res.json(error);
    }
})

app.listen(port, function(){
    console.log(`listening on port ${port}`);
})