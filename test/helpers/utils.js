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

const login = async (contact) => {
    return chai.request(app)
      .post('/api/v1/login')
      .send({
          contactNumber: contact,
          password: '1qaz2wsx'
      });
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

const sendMessage = async (contact) => {
    const user = await signUpAndLogin();
    await chai.request(app)
      .post('/api/v1/send')
      .set('Authorization', `Bearer ${user.userLogin.body.accessToken}`)
      .send({ receiverId: contact, textMessage: 'testing a test' });
    return user.userSignUp.body.contact;
};

export { signUp, signUpAndLogin, sendMessage, login }
