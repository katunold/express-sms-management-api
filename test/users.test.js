import chai from 'chai';
import chaihttp from 'chai-http';
import app from "../server";
import mockData, {adminSignUpData, signUpData} from './helpers/mock-data';
import db from "../server/models";
import {login, signUp, signUpAndLogin} from "./helpers/utils";

chai.use(chaihttp);

const { expect } = chai;

describe('Users route', () => {

    let token;

    afterEach((done) => {
        db.User.destroy({ where: {}, truncate: false });
        db.Message.destroy({ where: {}, truncate: false });
        done();
    });

    it('should return all users', async () => {
        token = await signUpAndLogin(adminSignUpData);
        const response = await chai.request(app)
          .get('/api/v1/users')
          .set('Authorization', `Bearer ${token.userLogin.body.accessToken}`);
        expect(response).to.have.status(200);
    });

    it('should not return any users to unauthorised users', async () => {
        token = await signUpAndLogin(signUpData);
        const response = await chai.request(app)
          .get('/api/v1/users')
          .set('Authorization', `Bearer ${token.userLogin.body.accessToken}`);
        expect(response).to.have.status(403);
    });
});
