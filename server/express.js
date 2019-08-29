import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import logger from 'morgan';
import swagger from 'swagger-ui-express';
import swaggerDoc from '../swagger';

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());
app.use(cors());
app.use('/api/v1/docs', swagger.serve, swagger.setup(swaggerDoc, { explorer: true }));

export default app
