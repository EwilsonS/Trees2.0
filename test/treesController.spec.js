const chai = require("chai");
// chai.use(require('chai-uuid'));
const should = chai.should();

const { expect } = require('chai')
const sinon = require('sinon')
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
}) 