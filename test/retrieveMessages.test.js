import sinon from 'sinon';
import chaiHttp from "chai-http";
import chai from 'chai';
import dbConnection from "../server/models";
import {retrievedMessages} from "./helpers/mock-data";
import {login, sendMessage, signUp, signUpAndLogin} from "./helpers/utils";
import app from "../server";

chai.use(chaiHttp);

const { expect } = chai;

describe('Retrieve route', () => {

    let contact;
    let user;
    let access;

    afterEach((done) => {
        dbConnection.User.destroy({ where: {}, truncate: false });
        dbConnection.Message.destroy({ where: {}, truncate: false });
        done();
    });

    beforeEach(async () => {
        contact = await signUp();
        access = await login(contact);
    });

    it('should retrieve sms', async () => {
        await sendMessage(contact);
        const response = await chai.request(app)
          .get('/api/v1/retrieve')
          .set('Authorization', `Bearer ${access.body.accessToken}`);

        expect(response).to.have.status(200);
    });

    it('should return an empty array of messages', (done) => {
        chai.request(app)
          .get('/api/v1/retrieve')
          .set('Authorization', `Bearer ${access.body.accessToken}`)
          .end( (err, res) => {
              expect(res).to.have.status(200);
              done();
          });
    });
});
