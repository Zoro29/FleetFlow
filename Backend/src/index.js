import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js';
import { json } from 'express';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
app.use(json());
app.use(cors({ origin: true }));
app.use('/api', routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

export default app;
