import express from 'express';
const router = express.Router();
console.log(router);

export default function setup(pool) {
	console.log(pool)
	// insert a todo
	router.post('/', async(req, res) => {
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
	router.get('/', async(req, res) => {
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
	router.get('/:id', async(req, res) => {
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

	//update specific todo
	router.put('/:id', async(req, res) => {
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

	//delete specific todo
	router.delete('/:id', async(req, res) => {
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

	//delete all todos
	router.delete('/', async(req, res) => {
		try {
			const deletedAll = await pool.query(
				"DELETE FROM todo"
			);
			res.json('all todos were deleted!');
		} catch (e) {
			console.log(e);
		}
	});
}

