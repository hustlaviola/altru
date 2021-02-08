import { body, query, param } from 'express-validator';

const validator = method => {
    switch (method) {
    case 'onboarding':
        return [
            body('email').exists()
                .withMessage('email is required')
                .isEmail()
                .withMessage('Please provide a valid email'),
            body('password').exists()
                .withMessage('password is required')
                .isLength({ min: 6 })
                .withMessage('password must be at least 6 characters')
        ];
    case 'profile':
        return [
            body('firstName').optional()
                .isLength({ min: 2, max: 50 })
                .withMessage('firstName must be between 2 to 50 characters long'),
            body('lastName').optional()
                .isLength({ min: 2, max: 50 })
                .withMessage('lastName must be between 2 to 50 characters long'),
            body('gender').optional()
                .isIn(['male', 'female'])
                .withMessage('gender can only be "male" or "female"'),
            body('country').optional()
                .isLength({ min: 2, max: 50 })
                .withMessage('country can only be 2 to 50 characters long'),
            body('city').optional()
                .isLength({ min: 2, max: 100 })
                .withMessage('city can only be 2 to 100 characters long'),
            body('address').optional()
                .isLength({ min: 2, max: 1000 })
                .withMessage('address can only be 2 to 1000 characters long'),
            body('province').optional()
                .isLength({ min: 2, max: 100 })
                .withMessage('province can only be 2 to 100 characters long'),
            body('postalCode').optional()
                .isLength({ max: 20 })
                .withMessage('postalCode cannot be more than 20 characters')
        ];
    case 'username':
        return [
            query('username').exists()
                .withMessage('username is required')
                .isLength({ min: 2, max: 50 })
                .withMessage('username can only be 2 to 50 characters long')
                .isAlphanumeric()
                .withMessage('username can only contain digits and alphabets')
        ];
    case 'username_body':
        return [
            body('username').exists()
                .withMessage('username is required')
                .isLength({ min: 2, max: 50 })
                .withMessage('username can only be 2 to 50 characters long')
                .isAlphanumeric()
                .withMessage('username can only contain digits and alphabets')
        ];
    case 'login':
        return [
            body('email').exists()
                .withMessage('email is required')
                .isEmail()
                .withMessage('Please provide a valid email'),
            body('password').exists()
                .withMessage('password is required')
        ];
    case 'plan_id_param':
        return [
            param('planId').exists()
                .withMessage('planId is required')
                .isInt()
                .withMessage('planId must be integer/long')
        ];
    case 'email':
        return [
            body('email').exists()
                .withMessage('email is required')
                .isEmail()
                .withMessage('Please provide a valid email')
        ];
    case 'password_reset':
        return [
            body('email').exists()
                .withMessage('email is required')
                .isEmail()
                .withMessage('Please provide a valid email'),
            body('password').exists()
                .withMessage('password is required')
                .isLength({ min: 6 })
                .withMessage('password must be at least 6 characters'),
            body('code').exists()
                .withMessage('code is required')
                .isInt()
                .withMessage('Invalid or expired code')
                .isLength({ min: 4, max: 4 })
                .withMessage('Invalid or expired code')
        ];
    default:
        break;
    }
};

export default validator;
