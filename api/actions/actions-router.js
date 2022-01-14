// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Action = require("./actions-model");

router.get("/", (req, res, next) => {
  Action.get()
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});
router.get("/", (req, res) => {});
router.post("/", (req, res) => {});
router.put("/", (req, res) => {});
router.delete("/", (req, res) => {});

module.exports = router;
