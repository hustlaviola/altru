import { express } from '../config/packages';
import OnboardingController from '../controllers/Onboarding';
import validator from '../validation/schema';
import validate from '../middlewares/validate';

const router = express.Router();

router.post('/clients',
    validator('onboarding'),
    validate,
    OnboardingController.clientSignUp);

router.post('/trainers',
    validator('onboarding'),
    validate,
    OnboardingController.trainerSignUp);

export default router;
