const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); 

const app = express();
app.use(cors());
app .use(express.json());

const port = 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo',
  password: '123',
  port: 5432,
});

app.post("/new", (req, res) => {
    pool.query(
      'insert into task (description) values ($1) returning *',
      [req.body.description],
      (error, result) => {
        if (error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(200).json({ id: result.rows[0].id });
        }
      }
    );
});

app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('delete from task where id = $1',
    [id],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ id: id });
      }
    });
});

app.get("/",(req,res)=>{
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
  