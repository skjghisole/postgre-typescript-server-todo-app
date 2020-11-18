import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';

import db from './db';
import initServices from './services';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false });

initServices(app, db);

app.get('/', async (req,res) => {
	try {
		res.json('Welcome to My Todo TS APP');
	} catch (e) {
		console.log(e)
	}
});

// initServices(app, db);


app.listen(process.env.PORT, () => {
	console.log(`Server starting at port: ${process.env.PORT}`);
})