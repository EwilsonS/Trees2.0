const { expect } = require('chai')
const sinon = require('sinon')
const fakeData = require('./fakeData')
const treesController = require('../controllers/treesController')

describe.only('treesController', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('findOne', () => {
    sinon.stub(treesController, 'findOne').returns(fakeData)

    it('should retrieve the only existing tree from db', async () => {
      const result = await treesController.findOne("root")
      expect(result).to.equal(fakeData)
    })
  })

  describe('create', () => {
    sinon.stub(treesController, 'create').returns(fakeData)

    it('should create a new tree named root', async () => {

      const result = await treesController.create({
        root: [
          {
            "wilsonFake": [[1997, 2004, 2017, 1994, 2019, 1988], [1987, 2019]]
          }
        ]
      })

      expect(result).to.equal(fakeData)
    })
  })
}) 