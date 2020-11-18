import todosService from './todosService';

export default function setupService(app, db) {
	app.use('/todos', () => todosService(db));
	return app;
}
