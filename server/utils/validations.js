import { body } from "express-validator";

export default class Validations {

    static validity = (context) => {

        switch (context) {
            case 'sign-up':
                return [
                    body('email', 'Provide a valid email').isEmail(),
                    body('userName', 'Username is required').exists().not().isEmpty(),
                    body('password', 'Password is required').exists().not().isEmpty(),
                    body('password', 'Password should be a minimum of 8 characters').isLength({ min: 8 })
                ];
            case 'send-message':
                return [
                    body('receiverId', 'receiverId is required').exists().not().isEmpty(),
                    body('textMessage', 'Password is required').exists().not().isEmpty(),
                    body('receiverId', 'receiverId is should have at-least 10 characters').isLength({ min: 10 })
                ];
            default:
                return [
                    body('contactNumber', 'Contact number is required').exists().not().isEmpty(),
                    body('password', 'Password is required').exists().not().isEmpty()
                ];
        }
    }

}
