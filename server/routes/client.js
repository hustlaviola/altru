import { express } from '../config/packages';
import validator from '../validation/schema';
import validate from '../middlewares/validate';
import Auth from '../middlewares/Auth';
import ClientController from '../controllers/Client';

const router = express.Router();

router.patch('/avatar',
    Auth.userAuth,
    ClientController.updateAvatar);

router.patch('/profile',
    Auth.userAuth,
    validator('profile'),
    validate,
    ClientController.updateProfile);

router.patch('/username',
    Auth.userAuth,
    validator('username_body'),
    validate,
    ClientController.updateUsername);

export default router;
