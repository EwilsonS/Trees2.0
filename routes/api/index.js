const router = require("express").Router();
const treeRoutes = require("./trees")

router.use("/trees", treeRoutes)

module.exports = router;
