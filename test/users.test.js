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

    it('should return an error message when the user to be deleted does not exist', async () => {
        token = await signUpAndLogin(adminSignUpData);
        const response = await chai.request(app)
          .delete('/api/v1/users/0706180670')
          .set('Authorization', `Bearer ${token.userLogin.body.accessToken}`);
        expect(response.body).to.have.property('msg').to.be.equal('User with contactId 0706180670 does not exist');
    });

    it('should delete an existing user account', async () => {
        token = await signUpAndLogin(adminSignUpData);
        const response = await chai.request(app)
          .delete(`/api/v1/users/${token.userSignUp.body.contact}`)
          .set('Authorization', `Bearer ${token.userLogin.body.accessToken}`);
        expect(response).to.have.status(204)
    });
});
