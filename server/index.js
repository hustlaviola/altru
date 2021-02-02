// import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import trimmer from 'trim-request-body';
import fileupload from 'express-fileupload';

import {
    express, httpStatus
} from './config/packages';
import messages from './utils/messages';
import APIError from './utils/error/APIError';
import handleError from './utils/error/handleError';
import { eLogger, iLogger } from './config/logger';
import routers from './routes/index';
import db from './database/models';

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

app.use('/api/v1/onboarding', routers.onboardingRouter);
app.use('/api/v1/auth', routers.authRouter);
app.use('/api/v1/users', routers.userRouter);
app.use('/api/v1/clients', routers.clientRouter);
app.use('/api/v1/trainers', routers.trainerRouter);

app.get('/', (req, res) => res.send(`<h1>${messages.root}</h1>`));

// Handle route 404
app.all('/*', (req, res, next) => {
    const err = new APIError(messages.pageNotFound, httpStatus.NOT_FOUND, true);
    return next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    if (!err.isOperational) {
        eLogger.error('PROGRAMMER ERROR', err);
    }
    handleError(err, res);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    iLogger.info(`listening on port: ${PORT}..`);
    await db.sequelize.authenticate();
    iLogger.info('DB connected');
});

export default app;
