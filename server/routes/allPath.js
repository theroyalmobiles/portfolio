const express = require("express");
const router = express.Router();
const { getAllPath, getPathByName, getAllModels, getAllModelsByName, getUrl } = require("../controllers/allPath");

router.get("/", getAllPath);
router.get("/all", getAllModels);
router.get("/url", getUrl);
router.get("/:name", getPathByName);
router.get("/all/:name", getAllModelsByName);

module.exports = router;
