const express = require("express");
const { postQueryRules, postQueryValidator } = require("../middleware/TagValidator")
const router = express.Router();

// Require controller modules.
var posts = require("../controllers/postAPI");

/// GET ROUTES ///

// GET ping
router.get("/ping", posts.ping);

// GET posts by tags
router.get("/posts", postQueryRules(), postQueryValidator, posts.byTags);

module.exports = router;
