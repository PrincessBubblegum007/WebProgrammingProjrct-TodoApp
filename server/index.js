const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); 

const app = express();
app.use(cors());

const port = 3001;

app.get("/",(req,res)=>{
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: '123',
        port: 5432,
    })


    pool.query('SELECT * FROM task', (error, results) => {
        if (error) {
            res.status(500).json({ error:error.message })
        }
        res.status(200).json(results.rows)
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  