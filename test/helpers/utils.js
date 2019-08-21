import chai from "chai";
import app from "../../server";

const signUp = async () => {

    const newUser = await chai.request(app)
      .post('/api/v1/signup')
      .send({
          email: 'arnold@gmail.com',
          userName: 'arnold',
          password: '1qaz2wsx'
      });

    return newUser.body.contact
};

const signUpAndLogin = async () => {
    const userSignUp = await chai.request(app)
      .post('/api/v1/signup')
      .send({
          email: 'katumba@gmail.com',
          userName: 'katumba',
          password: '1qaz2wsx'
      });

    const userLogin = await chai.request(app)
      .post('/api/v1/login')
      .send({
          contactNumber: userSignUp.body.contact,
          password: '1qaz2wsx'
      });

    return { userLogin, userSignUp };
};

export { signUp, signUpAndLogin }
