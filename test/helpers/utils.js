import chai from "chai";
import app from "../../server";

const login = async () => {

    const newUser = await chai.request(app)
      .post('/api/v1/signup')
      .send({
          email: 'arnold@gmail.com',
          userName: 'arnold',
          password: '1qaz2wsx'
      });

    return newUser.body.contact
};

export { login }
