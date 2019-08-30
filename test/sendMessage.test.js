import db from "../server/models";
import chai from 'chai';
import chaihttp from 'chai-http';
import app from "../server";
import {signUp, signUpAndLogin} from "./helpers/utils";
import {signUpData} from "./helpers/mock-data";

chai.use(chaihttp);

const { expect } = chai;

describe('Send route', () => {

    let contact;
    let user;

    afterEach((done) => {
        db.User.destroy({ where: {}, truncate: false });
        db.Message.destroy({ where: {}, truncate: false });
        done();
    });

    beforeEach(async () => {
        contact = await signUp();
        user = await signUpAndLogin(signUpData);
    });

    it('should send a message', (done) => {
        chai.request(app)
          .post('/api/v1/send')
          .set('Authorization', `Bearer ${user.userLogin.body.accessToken}`)
          .send({ receiverId: contact, textMessage: 'testing a test' })
          .end( (err, res) => {
              expect(res).to.have.status(201);
              done();
          })
    });

    it('should return an error when the sender is the receiver', (done) => {
        chai.request(app)
          .post('/api/v1/send')
          .set('Authorization', `Bearer ${user.userLogin.body.accessToken}`)
          .send({ receiverId: user.userSignUp.body.contact , textMessage: 'testing a test' })
          .end( (err, res) => {
              expect(res).to.have.status(403);
              done()
          })
    });

    it('should return an error when data is submitted with a missing field', (done) => {
        chai.request(app)
          .post('/api/v1/send')
          .set('Authorization', `Bearer ${user.userLogin.body.accessToken}`)
          .send({ receiverId: contact })
          .end( (err, res) => {
              expect(res).to.have.status(422);
              done()
          })
    });

    it('should return an error if receiverId does not exist', (done) => {
        chai.request(app)
          .post('/api/v1/send')
          .set('Authorization', `Bearer ${user.userLogin.body.accessToken}`)
          .send({ receiverId: '0700000000', textMessage: 'testing a test' })
          .end( (err, res) => {
              expect(res).to.have.status(400);
              done()
          })
    });
});
