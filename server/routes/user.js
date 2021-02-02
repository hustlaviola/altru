import { express } from '../config/packages';
import validator from '../validation/schema';
import validate from '../middlewares/validate';
import UserController from '../controllers/User';

const router = express.Router();

router.get('/',
    validator('username'),
    validate,
    UserController.checkUsername);

export default router;
