import { express } from '../config/packages';
import validator from '../validation/schema';
import validate from '../middlewares/validate';
import Auth from '../middlewares/Auth';
import TrainerController from '../controllers/Trainer';

const router = express.Router();

router.patch('/avatar',
    Auth.userAuth,
    TrainerController.updateAvatar);

router.patch('/plans/:planId',
    Auth.userAuth,
    validator('plan_id_param'),
    validate,
    TrainerController.updatePlan);

router.patch('/profile',
    Auth.userAuth,
    validator('profile'),
    validate,
    TrainerController.updateProfile);

router.patch('/username',
    Auth.userAuth,
    validator('username_body'),
    validate,
    TrainerController.updateUsername);

export default router;
