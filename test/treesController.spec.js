const chai = require("chai");
const should = chai.should();
const { expect } = require('chai')
const sinon = require('sinon')
const request = require('supertest');
const express = require('express');
const app = express();
const fakeData = require('./fakeData')
const treesController = require('../controllers/treesController')

describe('treesController', () => {
  beforeEach(() => {
  })

  // happy path
  describe('findOne', () => {
    sinon.stub(treesController, 'findOne').returns(fakeData)

    it('should retrieve the only existing tree from db', async () => {
      const result = await treesController.findOne("root")
      // expect(result).to.equal(fakeData)
      result.should.equal(fakeData)
    })

    // sad path
    it('should return an error message')

  })

  describe('#changeName', () => {
    it.only('should return 422 from /changeName/:id route', (done) => {
      request(app)
        .put('/changeName/5c47fca2627d593248cd3588')
        .expect(422)
        .end(function (err, res) {
          if (err) throw err;
          console.log('Got to the res', res)
          done()
        });
    })
  })
}) 