"use strict";

var router = require("express").Router();

router.get("/", function( req, res ) {
  console.log(res)
  res.render("index");
});

module.exports = router;
