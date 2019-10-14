const router = require("express").Router();
const treesController = require("../../controllers/treesController");

// Matches with "/api/trees/..."
router
  .route("/")
  .post(treesController.create)

router
  .route("/:name")
  .get(treesController.findOne)

router
  .route("/addFactory/:id")
  .put(treesController.addFactory)

router
  .route("/pullFactory/:id")
  .put(treesController.pullFactory)

router
  .route("/changeName/:id")
  .put(treesController.changeName)

router
  .route("/changeRange/:id")
  .put(treesController.changeRange)

module.exports = router;