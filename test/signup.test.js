import sinonChai from 'sinon-chai';
import chai from 'chai';
import chaihttp from 'chai-http';
import app from "../server";
import mockData from './helpers/mock-data';
import db from "../server/models";

chai.use(chaihttp);
chai.use(sinonChai);

const { expect } = chai;

describe('Sign-up route', () => {


    afterEach((done) => {
        db.User.destroy(
          {
              where: {},
              truncate: false
          }
        );
        done();
    });

    it('should create a new user account',(done) => {
        chai.request(app)
          .post('/api/v1/signup')
          .send(mockData.signUpData)
          .end((err, res) => {
              expect(res).to.have.status(201);
              expect(res.body).to.have.property('message').to.equal('You are successfully registered with us ');
              done();
          });
    });

    it('should return error if the email already exists', (done) => {
        chai.request(app)
          .post('/api/v1/signup')
          .send(mockData.signUpData)
          .end((err, res) => {
              chai.request(app)
                .post('/api/v1/signup')
                .send(mockData.signUpData)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('errors');
                    done();
                })
          });
    });

    it('should return an error message when data is submitted with a missing field', (done) => {
        chai.request(app)
          .post('/api/v1/signup')
          .send(mockData.signUpDataWithMissingFields)
          .end((err, res) => {
              expect(res).to.have.status(422);
              done();
          })
    });

    it('should return an error message when an invalid email is submitted', (done) => {
        chai.request(app)
          .post('/api/v1/signup')
          .send(mockData.signUpDataWithInvalidEmail)
          .end((err, res) => {
              expect(res).to.have.status(422);
              done();
          })
    });

});
