import { body } from "express-validator";

export default class Validations {

    static signUpValidations = () => (
      [
          body('email', 'Provide a valid email').isEmail(),
          body('userName', 'Username is required').exists().not().isEmpty(),
          body('password', 'Password is required').exists().not().isEmpty(),
          body('password', 'Password should be a minimum of 8 characters').isLength({ min: 8 })
      ]
    );

}
