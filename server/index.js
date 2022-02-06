const express = require("express");
const app = express();
const cors = require("cors"); 
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//get/view all books
app.get("/allbooks", async (req, res) => {
  try {
    const allbooks = await pool.query("SELECT * FROM allbooks");
    res.json(allbooks.rows);
  } catch (err) {
    console.error(err.message);
  }
});


//update/edit a book
app.put("/allbooks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { book_name } = req.body.book_name;
    const {author} = req.body.author;
    const {borrowed_by} = req.body.borrowed_by;
    const {borrow_date} = req.body.borrow_date;
    const {expected_return_date} = req.body.expected_return_date;
    const updateBook = await pool.query(
      "UPDATE allbooks SET book_name = $1 , author = $2, borrowed_by = $3, borrow_date = $4, expected_return_date = $5 , 45 ) WHERE todo_id = $2",
      [book_name, author, borrowed_by, borrow_date, expected_return_date]
    );
    res.json("Book was updated!");
  } catch (err) {
    console.error(err.message);
  }
});
//enter a book

app.post("/allbooks", async (req, res) => {
  try {
    const { book_name } = req.body.book_name;
    const {author} = req.body.author;
    const {borrowed_by} = req.body.borrowed_by;
    const {borrow_date} = req.body.borrow_date;
    const {expected_return_date} = req.body.expected_return_date;
    const newBook = await pool.query(
      "INSERT INTO allbooks (book_name, author, borrow_date, expected_return_date) VALUES($1, $2, $3, $4, 45 ) RETURNING *",
      [book_name, author, borrowed_by, borrow_date, expected_return_date]
    );
    res.json(newBook.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});



app.listen(5000, () => {
    console.log("server has started on port 5000");
  });