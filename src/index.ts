import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';

import pool from './db';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
	console.log(`Server starting at port: ${process.env.PORT}`);
})