import express from 'express';
import routes from './routes/index.js';
import { json } from 'express';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(json());
app.use('/api', routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
