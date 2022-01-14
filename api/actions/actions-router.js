// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Action = require("./actions-model");
const { validateById, validateBody } = require("./actions-middleware");

router.get("/", (req, res, next) => {
  Action.get()
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});
router.get("/:id", validateById, (req, res, next) => {
  Action.get(req.params.id)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

router.post("/", validateBody, (req, res, next) => {
  Action.insert(req.body)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});
router.put("/:id", validateById, validateBody, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});
router.delete("/:id", validateById, (req, res) => {
  Action.remove(req.params.id).then((action) => {
    res.json(action);
  });
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    custom: "an error occurred in the actions router",
    stack: err.stack,
  });
});

module.exports = router;
