// add middlewares here related to actions

const Action = require("./actions-model");

async function validateById(req, res, next) {
  const actionId = await Action.get(req.params.id);
  try {
    if (!actionId) {
      res
        .status(404)
        .json({ message: `the id ${req.params.id} does not exist` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateById,
};
