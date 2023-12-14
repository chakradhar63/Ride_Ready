process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const User = require("../models/userModel")


chai.use(chaiHttp);
const expect = chai.expect;

describe('User API Tests', () => {
    it('Signin user - Failure', async () => {
        const username = "john_doe";
        const password = "secret123";

        try {
            // Execute the query using await
            const user = await User.findOne({ username, password });

            const res = await chai.request(app)
                .post('/api/users/login')
                .send({username, password});

            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');

        } catch (error) {
            console.error('Error during test:', error);
            // Handle the error or fail the test if needed
            throw error;
        }
    }).timeout(5000);

    it('Signin user - Success', async () => {
        const username = 'IMT2020021';
        const password = '1234';

        try {
            // Execute the query using await
            const user = await User.findOne({ username, password });
            const res = await chai.request(app)
                .post('/api/users/login')
                .send({username, password});

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');

            // Add more assertions or actions based on your test scenario

        } catch (error) {
            console.error('Error during test:', error);
            // Handle the error or fail the test if needed
            throw error;
        }
    });



});
