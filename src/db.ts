import * as pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
	user: "postgres",
	password: "password",
	host: "localhost",
	port: 5432,
	database: "perntodo"
})

export default pool;