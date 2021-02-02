import { express } from '../config/packages';
import validator from '../validation/schema';
import validate from '../middlewares/validate';
import AuthController from '../controllers/Auth';

const router = express.Router();

router.post('/clients/login',
    validator('login'),
    validate,
    AuthController.clientLogin);

router.post('/clients/forgot_password',
    validator('email'),
    validate,
    AuthController.clientForgotPassword);

router.post('/clients/reset_password',
    validator('password_reset'),
    validate,
    AuthController.clientResetPassword);

router.post('/trainers/login',
    validator('login'),
    validate,
    AuthController.trainerLogin);

router.post('/trainers/forgot_password',
    validator('email'),
    validate,
    AuthController.trainerForgotPassword);

router.post('/trainers/reset_password',
    validator('password_reset'),
    validate,
    AuthController.trainerResetPassword);

export default router;
