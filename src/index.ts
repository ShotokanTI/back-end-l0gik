import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import {createConnection} from 'typeorm'

import userRoutes from './routes/series.routes'

const app = express();
createConnection();

// Middlewares
app.use(cors());
app.use(express.static("uploads"))
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use(userRoutes);

app.listen(8080);
console.log('Server on port', 8080);