import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import httpStatus from 'http-status';
import trimmer from 'trim-request-body';
import fileupload from 'express-fileupload';

import messages from './utils/messages';
import APIError from './utils/error/APIError';
import handleError from './utils/error/handleError';
import { eLogger, iLogger } from './config/logger';

const app = express();

app.use(express.json());

// Compress response
// app.use(compression());

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(fileupload({
    limits: {
        fileSize: 20 * 1024 * 1024
    },
    abortOnLimit: true,
    responseOnLimit: messages.fileLimitReached,
    useTempFiles: true
}));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Trim request body
app.use(trimmer);

app.get('/', (req, res) => res.send(`<h1>${messages.root}</h1>`));

// Handle route 404
app.all('/*', (req, res, next) => {
    const err = new APIError(messages.pageNotFound, httpStatus.NOT_FOUND, true);
    return next(err);
});

app.use((err, req, res) => {
    if (!err.isOperational) {
        eLogger.error('PROGRAMMER ERROR', err);
    }
    handleError(err, res);
});

const { PORT } = process.env;

app.listen(PORT, () => iLogger.info(`listening on port: ${PORT}..`));

export default app;
