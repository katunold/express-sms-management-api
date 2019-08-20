import { PasswordReset } from "../controllers/password-reset.controllers";
import { SignUp } from "../controllers/signup.controllers";
import { Login } from "../controllers/login.controllers";
import Validations from "../utils/validations";

export const routes = router => {
    /**
     * route to handle user signUpx
     */
    router.route('/signup').post(Validations.signUpValidations(), SignUp.signUp);

    /**
     * route to handle user login
     */
    router.route('login').post(Login.login);

    /**
     * route to handle email confirmation
     */
    router.route('confirmation/:token')
      .get(SignUp.verifyAccount);

    /**
     * route to resend the email confirmation link
     */
    router.route('users/resend')
      .post(SignUp.resendVerificationLink);

    /**
     * route to request for password reset link
     */
    router.route('reset-password')
      .post(PasswordReset.passwordReset);

    /**
     * change password
     */
    router.route('reset/:token')
      .post(PasswordReset.editPassword);

};

