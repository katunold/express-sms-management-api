import {signUp} from "./helpers/utils";
import chai from 'chai';
import chaihttp from 'chai-http';
import app from "../server";
import db from "../server/models";

chai.use(chaihttp);

const { expect } = chai;

describe('Login route',() => {

    let contact;

    afterEach((done) => {
        db.User.destroy(
          {
              where: {},
              truncate: false
          }
        );
        done();
    });

    beforeEach(async () => {
        contact = await signUp();
    });

    it('should return an access token', (done) => {
        chai.request(app)
          .post('/api/v1/login')
          .send({contactNumber: contact,
              password: '1qaz2wsx'})
          .end((err, res) => {
              expect(res).to.have.status(200);
              done();
          });
    });

    it('should return a 404 when a user does not exist', (done) => {
        chai.request(app)
          .post('/api/v1/login')
          .send({contactNumber: "070061806",
              password: '1qaz2wsx'})
          .end((err, res) => {
              expect(res).to.have.status(404);
              done();
          });
    });

    it('should return a 422 when data is submitted with missing fields', (done) => {
        chai.request(app)
          .post('/api/v1/login')
          .send({contactNumber: "070061806"})
          .end((err, res) => {
              expect(res).to.have.status(422);
              done();
          });
    });

});
