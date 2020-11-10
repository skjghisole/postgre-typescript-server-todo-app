import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';

import pool from './db';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false });

app.get('/', async (req,res) => {
	try {
		res.json('Welcome to My Todo TS APP');
	} catch (e) {
		console.log(e)
	}
});


// insert a todo
app.post('/todos', async(req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			"INSERT INTO todo (description) VALUES($1) RETURNING *"
		, [description]);
		res.json(newTodo.rows[0]);
	} catch (e) {
		console.log(e)
	}
});


// get all todos
app.get('/todos', async(req, res) => {
	try {
		const { rows } = await pool.query(
			"SELECT * FROM todo"
		);
		res.json(rows);
	} catch (e) {
		console.log(e)
	}
});


// get specific todo
app.get('/todos/:id', async(req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await pool.query(
			"SELECT * FROM todo WHERE todo_id = $1",
			[id]
		);
		res.json(rows);
	} catch (e) {
		console.log(e);
	}
});

app.put('/todos/:id', async(req, res) => {
	try {
		const { body: { description }, params: { id } } = req;
		const updatedTodo = await pool.query(
			"UPDATE todo SET description = $1 WHERE todo_id = $2",
			[description, id]
		);
		res.json(`todo_id: ${id} was updated!`);
	} catch (e) {
		console.log(e);
	}
});

app.delete('/todos/:id', async(req, res) => {
	try {
		const { id } = req.params;
		const deletedTodo = await pool.query(
			"DELETE todo WHERE todo_id = $1",
			[id]
		);
		res.json(`todo_id: ${id} was deleted!`);
	} catch(e) {
		console.log(e);
	}
});

app.delete('/todos', async(req, res) => {
	try {
		const deletedAll = await pool.query(
			"DELETE FROM todo"
		);
		res.json('all todos were deleted!');
	} catch (e) {
		console.log(e);
	}
});


app.listen(process.env.PORT, () => {
	console.log(`Server starting at port: ${process.env.PORT}`);
})