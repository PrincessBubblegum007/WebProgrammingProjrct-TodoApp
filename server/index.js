require('dotenv').config();
console.log(process.env);
const express = require('express');
const cors = require('cors');
const{ query } = require('./helpers/db');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.post("/new", async (req, res) => {
    try {
      const result = await query('insert into task (description) values ($1) returning *',
      [req.body.description]);
      res.status(200).json({id : result.rows[0].id})
    } catch (error) {
        console.log(error)
        res.statusMessage = error;
        res.status(500).json({error: error})
    }
});

app.delete("/delete/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await query('delete from task where id = $1', 
      [id]);
    res.status(200).json({id : id})
  } catch (error) {
      console.log(error)
      res.statusMessage = error;
      res.status(500).json({error: error})
  }
});

app.get("/", async (req,res)=>{
  try{
    const result = await query('select * from task');
    if (!result || !result.rows) {
      throw new Error('No data returned from database');
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({
      error: error.message || 'Internal server error'
    });
  }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
